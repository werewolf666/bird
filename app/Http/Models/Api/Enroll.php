<?php

namespace App\Http\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Enroll extends Model
{
    protected $table = 'bd_enroll_info';
    protected $primaryKey = 'enroll_id';
    public $timestamps = false;
}
