<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin
    {--email=}
    {--password=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates starter admin from application';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');
        $password = $this->option('password');

        if (!$email || !$password) {
            $this->error('Inform --email and --password');
            return self::FAILURE;
        }

        $user = User::firstOrCreate(
            [
                'email' => $email
            ],
            [
                'name' => 'Admin',
                'password' => Hash::make($password),
            ]
        );

        $user->update(['role' => 'admin']);


        $this->info('Admin successful created!');
    }
}
