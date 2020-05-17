<?php

namespace App\Http\Service\Api;
use App\Http\Models\Api\Enroll;
use App\Http\Models\Api\Mark;
use App\Http\Models\Api\User;
use App\Utils\KeyUtils;
use App\Utils\Guid;
use App\Utils\Logging;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx as Wxlsx;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx as Rxlsx;

class ApiService {

    protected $enroll;
    protected $user;
    protected $mark;

    public function __construct(){
        //绑定模型
        if (null == $this->enroll)$this->enroll = new Enroll();
        if (null == $this->mark)$this->mark = new Mark();
        if (null == $this->user)$this->user = new User();
    }


    public function addEnroll($name,$bird_no,$remark)
    {
        $now_time = date('Y-m-d H:m:s');
        $data = [
            'enroll_id'=>Guid::get(),
            'name'=>$name,
            'bird_no'=>$bird_no,
            'remark'=>$remark,
            'start_time'=>$now_time,
            'update_time'=>$now_time,
        ];
        $r = $this->enroll->insert($data);
        Logging::log('addEnroll::data',$data);
        Logging::log('addEnroll::result',$r);
        if ($r){
            $result = ['code'=>0,'msg'=>'ok'];
        }else{
            $result = ['code'=>1,'msg'=>'添加错误'];
        }
        return $result;

    }

    public function getEnroll()
    {
        $data = $this->enroll->orderby('start_time','desc')->get();
        $total = count($data);
        return array('code'=>0,'msg'=>'ok','data'=>$data,'total'=>$total);
    }

    public function exportList($data)
    {
        try{
            $this->log('export_start_time',date('Y-m-d H:i:s'));
    		$job_id = $data['job_id'];
            $list = isset($this->getEnroll($data)['data'])?$this->getEnroll($data)['data']:[];
    		$key = KeyUtils::EXPORT_ENROLL_LIST.":".$job_id;
    		$config = $this->getConfigValue('export_enroll_addr');
    		$dir = __DIR__.'/../../..'.'/download/bird/'.date('Y-m-d') .'/';
    		if(!is_dir($dir)){
            	mkdir($dir, 0777, true);
        	}
            // STEP_1 加载模板
            $template_file = __DIR__.'/../../..'.'/download/bird/bird_template.xlsx';
            $reader = new Rxlsx();
            $spreadsheet = $reader->load($template_file);
            $sheet = $spreadsheet->getActiveSheet();

            $row = 2;//第三行开始写入
            foreach ($list as $items) {
                $row++;
                $index = 1;//第一列开始
                foreach ($items as $item) {
                    $sheet->setCellValueByColumnAndRow($index, $row, $item);
                    $index++;
                }
            }
            $file_name = $dir . $job_id . '.xlsx';
            $url =$config['domain'].$config['dir'].date('Y-m-d') .'/'.$job_id.'.xlsx';//下载目录(直接映射到download目录)
            $this->log('file_info_'.$job_id,['file_name'=>$file_name,'url'=>$url]);
            $writer = new Wxlsx($spreadsheet);
            $writer->save($file_name);
            $result = array('code' => 0, 'msg' => 'ok', 'url' => $url);
            $this->getRedis()->set($key, json_encode($result));
            $this->log('export_end_time',date('Y-m-d H:i:s'));
            return $result;

    	}catch(\Exception $e){
            $this->log("error dealExportTicket", $e->getMessage());
    		$key = KeyUtils::EXPORT_ENROLL_LIST.":".$data['job_id'];
    		$result = ['code'=>3,'msg'=>$e->getMessage()];
    		$this->getRedis()->set($key,json_encode($result));
            return $result;
    	}
    }
}