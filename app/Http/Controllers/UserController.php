<?php

namespace App\Http\Controllers;

use App\Enums\UserStatus;
use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(public UserInterface $user) {}

    public function index(Request $request): Response
    {
        $users = $this->user->findAll($request);
        return Inertia::render('users/index/page', [
            'users' => $users,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "string", "min:3", "max:255"],
            "email" => ["required", "email", "unique:users"],
            "password" => ["required"],
            "status" => ["nullable", Rule::enum(UserStatus::class)]
        ]);

        $validated["password"] = Hash::make($request->password);

        $user = $this->user->create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            "name" => ["required", "string", "min:3", "max:255"],
            "email" => [
                "required",
                "email",
                Rule::unique("users")->ignore($user->id),
            ],
            "avatar" => ["nullable", "image", "mimes:jpg,png,jpeg,webp", "size:5120"],
            "status" => ["nullable", Rule::enum(UserStatus::class)]
        ]);

        if ($request->filled("password")) {
            $validated["password"] = Hash::make($request->password);
        }

        $user = $this->user->update($user->id, $validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = $this->user->findById($id);
        $user->delete();
        return back();
    }
}
