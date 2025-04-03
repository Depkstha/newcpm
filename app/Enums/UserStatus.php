<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case IN_ACTIVE = 'inactive';
}
