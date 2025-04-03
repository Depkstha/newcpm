<?php

namespace App\Interfaces;

use App\Interfaces\ModelInterface;

interface PermissionInterface extends ModelInterface
{
    public static function generatePermissionFromRoutes();
    public function getPermissionListsArrangedByPrefix();
}
