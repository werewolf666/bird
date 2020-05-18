<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', function () {
    return view('home/index');
});

Route::group(['prefix'=>'api/enroll'],function (){
    Route::any('add','Api\ApiController@addEnroll');
    Route::any('','Api\ApiController@getEnroll');
    Route::any('export','Api\ApiController@exportEnroll');
    Route::any('checkfile','Api\ApiController@checkFile');
    Route::any('update','Api\ApiController@updateEnroll');
    Route::any('del','Api\ApiController@delEnroll');
});