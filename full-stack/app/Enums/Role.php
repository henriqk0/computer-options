<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case REVIEWER = 'reviewer';
    case USER = 'user';
}
