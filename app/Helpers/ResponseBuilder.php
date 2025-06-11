<?php

namespace App\Helpers;

class ResponseBuilder
{
    /**
     * Success Response
     */
    public static function success($dataOrMessage = [], $code = 200)
    {
        $method = request()->method();

        if ($method === 'GET') {
            return response()->json([
                'status' => true,
                'data' => $dataOrMessage,
            ], $code);
        }

        return response()->json([
            'status' => true,
            'message' => $dataOrMessage,
        ], $code);
    }

    /**
     * Error Response
     */
    public static function error($message = 'Something went wrong', $code = 400)
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], $code);
    }
}
