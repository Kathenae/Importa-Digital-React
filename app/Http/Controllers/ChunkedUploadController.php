<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChunkedUploadController extends Controller
{

    public function index()
    {
        return Inertia::render('ChunkedUpload');
    }

    public function post()
    {
        $chunkIndex = request()->get('chunkIndex', 0);
        $totalChunks = request()->get('chunkCount', 0);
        $chunkSize = request()->get('chunkSize', 0);
        $fileName = request()->get('filename');
        $filePath = storage_path('app/extra_videos/' . $fileName);

        if (!file_exists($filePath)) {
            mkdir($filePath, 0755, true);
        }

        // store the file
        $file = $file = fopen($filePath . '/' . $fileName, 'ab');
        $chunkFile = fopen($_FILES['chunkData']['tmp_name'],'rb');
        while($buffer = fread($chunkFile, $chunkSize)){
            fwrite($file, $buffer);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
