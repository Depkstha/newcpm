<?php

namespace App\Repositories;

use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleInterface
{
    public function findAll($request, ?callable $query = null, bool $paginate = false, int $limit = 10)
    {
        $baseQuery = Role::query();

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
        $baseQuery = Role::query();

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
        return Role::create($data);
    }

    public function update($id, array $data)
    {
        return tap($this->findById($id), function ($role) use ($data) {
            $role->update($data);
        });
    }


    public function pluck(?callable $query = null)
    {
        $baseQuery = Role::query();

        if (is_callable($query)) {
            $query($baseQuery);
        }

        return $baseQuery->pluck('id', "name");
    }
}
