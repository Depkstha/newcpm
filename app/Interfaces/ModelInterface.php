<?php

namespace App\Interfaces;

interface ModelInterface
{
    public function findAll($request, ?callable $query = null, bool $paginate = false, int $limit = 10);
    public function findById($id, ?callable $query = null);
    public function delete($id);
    public function create(array $data);
    public function update($id, array $newData);
    public function pluck(?callable $query = null);
}

