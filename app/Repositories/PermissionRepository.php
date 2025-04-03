<?php

namespace App\Repositories;

use App\Interfaces\PermissionInterface;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionRepository implements PermissionInterface
{
    public function findAll($request, ?callable $query = null, bool $paginate = false, int $limit = 10)
    {
        $baseQuery = Permission::query();

        if ($query) {
            $query($baseQuery);
        }

        if ($paginate) {
            return $baseQuery->paginate($limit);
        }

        return $baseQuery->latest()->get();
    }


    public function findById($id, ?callable $query = null)
    {
        $baseQuery = Permission::query();

        if (is_callable($query)) {
            $query($baseQuery);
        }

        return $baseQuery->whereId($id)->firstOrFail();
    }

    public function delete($id)
    {
        $role = $this->findById($id);
        $role->delete();
        return $role;
    }

    public function create(array $data)
    {
        return Permission::create($data);
    }

    public function update($id, array $data)
    {


























































































































































            }


    public function pluck(?callable $query = null)
    {
        $baseQuery = Permission::query();

        if (is_callable($query)) {
            $query($baseQuery);
        }

        return $baseQuery->pluck('id', "name");
    }

    public static function generatePermissionFromRoutes()
    {
        $routes = Route::getRoutes();
        foreach ($routes as $route) {

            $routeName = $names[] = $route->getName();

            $ignoreRoutes = [
                'debugbar',
                'unisharp',
                'livewire',
                'login',
                'register',
                'logout',
                'post',
                'sanctum',
                'ignition',
                'welcome',
                'home',
                'api',
            ];

            $routePrefix = explode('.', $routeName);
            if (is_array($routePrefix) && !empty($routePrefix[0])) {
                if (!in_array($routePrefix[0], $ignoreRoutes) && !Permission::where('name', $routeName)->exists()) {
                    Permission::updateOrCreate(['name' => $routeName], ['name' => $routeName, 'guard_name' => 'web']);
                }
            }
        }

        $permissions = Permission::pluck('name', 'id');
        $diffRoutes = array_diff($permissions->toArray(), $names);
        if ($diffRoutes) {
            Permission::whereIn('id', array_keys($diffRoutes))->delete();
        }

        $roles = Role::all();
        foreach ($roles as $role) {

            if ($role->name == 'admin' || $role->name == 'super-admin') {
                $role->givePermissionTo(Permission::all());
            }
        }

    }

    public function getPermissionListsArrangedByPrefix()
    {
        $permissions = Permission::all();
        $routeNameArr = [];
        foreach ($permissions as $permission) {
            if (!is_null($permission->name)) {
                $routeName = explode('.', $permission->name);
                if (is_array($routeName) && !empty($routeName[0])) {
                    $routeNameArr[$routeName[0]][$permission->id] = array_key_exists(1, $routeName) ? $routeName[1] : $routeName[0];
                }
            }
        }

        ksort($routeNameArr);

        return $routeNameArr;
    }
}
