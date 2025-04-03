<?php

namespace App\Console\Commands;

use App\Repositories\PermissionRepository;
use Illuminate\Console\Command;

class GeneratePermissionLists extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate permissions using named route!';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating Permissions');
        PermissionRepository::generatePermissionFromRoutes();
        $this->info('Permissions have been generated!');
    }
}
