<?php

namespace App\Http\Controllers;

use App\Interfaces\PermissionInterface;
use App\Interfaces\RoleInterface;
use DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(private RoleInterface $role, private PermissionInterface $permission)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $roles = $this->role->findAll($request);
        return Inertia::render('roles/index/page', [
            'roles' => $roles,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $permissionLists = $this->permission->getPermissionListsArrangedByPrefix();
        return Inertia::render('roles/role-form', [
            'title' => 'create Role',
            'type' => 'create',
            'permissionLists' => $permissionLists,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', "unique:role,name"],
            'guard_name' => ['required', 'string', Rule::in(['web', 'api'])],
            'permissions' => ['required','array'],
            'permissions.*' => ['integer','exists:permissions,id']
        ]);

        DB::transaction(function () use ($validated, $request) {

            $role = $this->role->create($validated);

            if($request->permissions) {
                $role->permissions()->attach($request->permissions);
            }
        });

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $role = $this->role->findById($id);
        return Inertia::render('roles/index/role-form', [
            'title' => 'Edit Role',
            'type' => 'Edit',
            'role' => $role,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', Rule::unique('roles', 'name')->ignore($id)],
            'guard_name' => ['required', 'string', Rule::in(['web', 'api'])],
            'permissions' => ['required','array'],
            'permissions.*' => ['integer','exists:permissions,id']
        ]);

        DB::transaction(function () use ($id, $validated, $request) {

            $role = $this->role->update($id,$validated);

            if($request->permissions) {
                $role->permissions()->sync($request->permissions);
            }
        });

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::transaction(function () use ($id) {
            $role = $this->role->findById($id);
        $role->permissions()->detach();
        $role->delete();
        });

        return back();
    }
}
