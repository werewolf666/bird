<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Service\Api\ApiService;
use Input;
use App\Utils\Guid;
use App\Utils\Logging;

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
        // echo json_encode($result);
        // print_r($result);
    }

    public function exportEnroll()
    {
        $job_id = Guid::get();
        $result = $this->api_service->exportEnroll($job_id);
        return response()->json($result);
    }

    public function checkFile()
    {
        try{
            $job_id = Input::input('job_id');
            if (empty($job_id)) {
                return response()->json(['code'=>1,'msg'=>'job_id 不能为空']);
            }
            $result = $this->api_service->checkFile($job_id);
            return response()->json($result);
        }catch(\Exception $e){
            Logging::log("error checkFile", $e->getMessage());
            $result = array('code' => 4,'msg' => $e->getMessage());
            return response()->json($result);
        }
    }

    public function updateEnroll(){}
    public function delEnroll(){}
}
