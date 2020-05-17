<?php
namespace App\Utils;

use Request;

class Logging{

     public static function log($title,$content){
         self::info($title, $content);
     }

    public static function _log($fileName, $title, $info = array(), $level = null){
        $level = is_null($level) ? 'INFO' : strtoupper($level);
        $dir = base_path().'/storage/logs/'.date('Y-m-d') .'/';
        if(!is_dir($dir)){
            mkdir($dir, 0777, true);
        }
        $file = $dir.$fileName.'.log';
        $date = date('Y/m/d H:i:s', time());
        $infoJSON = json_encode($info, JSON_UNESCAPED_UNICODE);
        $log = "[" . $date . "] - " . $level . " - " . $title . " - " . $infoJSON. "\r\n\r\n";
        file_put_contents($file, $log, FILE_APPEND);
    }

    public static function info($title, $info = array()){
        $fileName = implode('-',explode('/',Request::path()));
        self::_log($fileName, $title, $info, 'INFO');
    }

    public static function debug($title, $info){
        self::_log('debug', $title, $info, 'DEBUG');
    }

    public static function exception($title, $info){
        self::_log('exception', $title, $info, 'ERROR');
    }
}