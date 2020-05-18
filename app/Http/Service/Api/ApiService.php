<?php

namespace App\Http\Service\Api;
use App\Http\Models\Api\EnrollModel;
use App\Http\Models\Api\MarkModel;
use App\Http\Models\Api\UserModel;
use App\Utils\KeyUtils;
use App\Utils\Guid;
use App\Utils\Logging;
use Illuminate\Support\Facades\Redis;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx as Wxlsx;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx as Rxlsx;
use DB;

class ApiService {

    protected $enroll;
    protected $user;
    protected $mark;

    public function __construct(){
        //绑定模型
        if (null == $this->enroll)$this->enroll = new EnrollModel();
        if (null == $this->mark)$this->mark = new MarkModel();
        if (null == $this->user)$this->user = new UserModel();
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
        $data = $this->enroll->orderby('start_time','desc')->get()->toArray();
        $total = count($data);
        return array('code'=>0,'msg'=>'ok','data'=>$data,'total'=>$total);
    }

    public function exportEnroll($job_id)
    {
        try{
            $job_id = $job_id;
            $list = $this->getEnroll();
            $list = isset($list['data'])?$list['data']:[];
    		$key = KeyUtils::EXPORT_ENROLL_LIST.$job_id;
    		$config = config('app.export_enroll_addr');
    		$dir = base_path().'/storage/download/bird/'.date('Y-m-d') .'/';
    		if(!is_dir($dir)){
            	mkdir($dir, 0777, true);
        	}
            // STEP_1 加载模板
            $template_file = base_path().'/storage/download/bird/bird_template.xlsx';
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
            Logging::log('file_info_'.$job_id,['file_name'=>$file_name,'url'=>$url]);
            $writer = new Wxlsx($spreadsheet);
            $writer->save($file_name);
            Redis::set($key, json_encode(['code' => 0,'url'=>$url]));
            $result = ['code'=>0,'msg'=>'ok','data'=>['job_id'=>$job_id]];
            return $result;

    	}catch(\Exception $e){
            Logging::log("error dealExportTicket", $e->getMessage());
    		$key = KeyUtils::EXPORT_ENROLL_LIST.$job_id;
            $result = ['code'=>3,'msg'=>$e->getMessage()];
            Redis::set($key, json_encode($result));
            return $result;
    	}
    }

    public function checkFile($job_id)
    {
        $key = KeyUtils::EXPORT_ENROLL_LIST.$job_id;
        $r = Redis::get($key);
        if (empty($r)) {
                return ['code' => 2, 'msg' => 'file not prepare'];
        }
        Logging::log(KeyUtils::EXPORT_ENROLL_LIST.":".$job_id,$r);
        $r = json_decode($r,true);
        if ($r['code'] != 0) {
            //文件导出错误
            return ['code' => 3, 'msg' => 'export error'];
        }
        $url = $r['url'];
        $result = ['code'=>0,'msg'=>'ok','data'=>['url'=>$url]];
        return $result;
    }
}