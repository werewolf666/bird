<?php

namespace App\Http\Models\Api;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'bd_user_info';
    protected $primaryKey = 'user_id';
    public $timestamps = false;
}
