<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VideoStreamController extends Controller
{
    public function stream(Lesson $lesson)
    {

        $filePath = Storage::path($lesson->videoUrl);

        if (!File::exists($filePath)) {
            Log::info("File does not exist: " . $filePath);
            abort(404);
        }

        $stream = new VideoStream($filePath);
        $stream->start();
    }
}
