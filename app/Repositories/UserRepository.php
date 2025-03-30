<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;

class UserRepository implements UserInterface
{
    public function findAll($request, ?callable $query = null, bool $paginate = false, int $limit = 10)
    {
        $baseQuery = User::query();

        if ($request->filled('search')) {
            $baseQuery->whereAny(
                [
                    'name',
                ],
                'LIKE',
                "%{$request->search}%"
            );
        }

        if ($request->filled('email')) {
            $baseQuery->where('email', 'LIKE', "%{$request->email}%");
        }

        if ($query) {
            $query($baseQuery);
        }

        if ($paginate) {
            return $baseQuery->paginate($limit);
        }

        return $baseQuery->get();
    }


    public function findById($id, ?callable $query = null)
    {
        $baseQuery = User::query();

        if (is_callable($query)) {
            $query($baseQuery);
        }

        return $baseQuery->whereId($id)->firstOrFail();
    }

    public function delete($id)
    {
        $employee = $this->findById($id);
        $employee->delete();
        return $employee;
    }

    public function create(array $data)
    {
        $employee = User::create($data);
        return $employee;
    }

    public function update($id, array $data)
{
    return tap($this->findById($id), function ($employee) use ($data) {
        $employee->update($data);
    });
}


    public function pluck(?callable $query = null)
    {
        $baseQuery = User::query();

        if (is_callable($query)) {
            $query($baseQuery);
        }

        return $baseQuery->pluck('id', "name");
    }
}
