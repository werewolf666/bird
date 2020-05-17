<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Service\Api\ApiService;
use Input;

class ApiController extends Controller
{
    public $api_service = null;

    public function __construct(){
        if(null == $this->api_service) $this->api_service = new ApiService();
    }

    /**
     * 报名
     */
	public function addEnroll()
    {
        $name = Input::input('name');
        $bird_no = Input::input('bird_no');
        $remark = Input::input('remark');
        if(empty($bird_no)){
            return response()->json(['code'=>1,'msg'=>'脚环号不能为空']);
        }
        $result = $this->api_service->addEnroll($name,$bird_no,$remark);
        return response()->json($result);
    }
    public function getEnroll()
    {
        $result = $this->api_service->getEnroll();
        return response()->json($result);
    }

    public function exportEnroll()
    {
        $this->api();
        $data['job_id']=$this->id();
        $result = $this->api_service->exportEnroll($data);
        return $this->result($result)->json()->response();
    }

    public function checkFile()
    {
        $this->api();
        try{
            $job_id = Input::input('job_id');
            if (empty($job_id)) {
                return $this->result(['code'=>1,'msg'=>'params is null'])->json()->response();
            }
            $key = KeyUtils::EXPORT_ENROLL_LIST.':'.$job_id;
            $r = $this->getRedis()->get($key);
            if (empty($r)) {
                 return $this->result(['code' => 2, 'msg' => 'file not prepare'])->json()->response();
            }
            $this->log(KeyUtils::EXPORT_ENROLL_LIST.":".$job_id,$r);
            $r = json_decode($r,true);
            if ($r['code'] != 0) {
                //文件导出错误
                return $this->result(['code' => 3, 'msg' => 'export error'])->json()->response();
            }
            $url = $r['url'];
            $result = ['code'=>0,'msg'=>'ok','data'=>['url'=>$url]];
            return $this->result($result)->json()->response();
        }catch(\Exception $e){
            $this->log("error checkFile", $e->getMessage());
            $result = array('code' => 4,'msg' => $e->getMessage());
            return $this->result($result)->json()->response();
        }
    }

    public function updateEnroll(){}
    public function delEnroll(){}
}
