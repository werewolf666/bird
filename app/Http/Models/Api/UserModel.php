<?php

namespace App\Http\Models\Api;

use App\Http\Models\BaseModel;

class UserModel extends BaseModel
{
    protected $table = 'bd_user_info';
    protected $primaryKey = 'user_id';
}
