<?php

namespace App\Http\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    protected $table = 'bd_mark_info';
    protected $primaryKey = 'mark_id';
    public $timestamps = false;
}
