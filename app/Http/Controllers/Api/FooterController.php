<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseBuilder;
use App\Http\Controllers\Controller;
use App\Models\Footer;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    public function index()
    {
        $footer = Footer::first();
        if (!$footer) {
            return ResponseBuilder::error('No footers found', 404);
        }
        return ResponseBuilder::success($footer);
    }

    public function show($id)
    {
        $footer = Footer::find($id);
        if (!$footer) {
            return ResponseBuilder::error('Footer not found', 404);
        }

        return ResponseBuilder::success($footer);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'store' => 'nullable|string',
            'phone' => 'nullable|array',
            'email' => 'nullable|email',
            'timing' => 'nullable|array',
            'social_media' => 'nullable|array',
            'description' => 'nullable|string',
            'experience' => 'nullable|integer',
            'users' => 'nullable|integer',
        ]);

        $footer = Footer::create($data);
        return ResponseBuilder::success($footer, 201);
    }

    public function update(Request $request, $id)
    {
        $footer = Footer::find($id);
        if (!$footer) {
            return ResponseBuilder::error('Footer not found', 404);
        }

        $data = $request->validate([
            'store' => 'nullable|string',
            'phone' => 'nullable|array',
            'email' => 'nullable|email',
            'timing' => 'nullable|array',
            'social_media' => 'nullable|array',
            'description' => 'nullable|string',
            'experience' => 'nullable|integer',
            'users' => 'nullable|integer',
        ]);

        $footer->update($data);
        return ResponseBuilder::success($footer);
    }

    public function destroy($id)
    {
        $footer = Footer::find($id);
        if (!$footer) {
            return ResponseBuilder::error('Footer not found', 404);
        }

        $footer->delete();
        return ResponseBuilder::success('Deleted successfully');
    }
}
