<?php

namespace App\Helpers;

class ResponseBuilder
{
    public static function success($dataOrMessage = [], $code = 200)
    {
        $method = request()->method();

        // $code = (int) $code;
        // if ($code < 100 || $code > 599) {
        //     $code = 200;
        // }

        if ($method === 'GET') {
            return response()->json([
                'status' => true,
                is_string($dataOrMessage) ? 'message' : 'data' => $dataOrMessage,
            ], $code);

        }

        return response()->json([
            'status' => true,
            is_string($dataOrMessage) ? 'message' : 'data' => $dataOrMessage,
        ], $code);
    }

    public static function error($message = 'Something went wrong', $code = 400, $errorDetails = null)
    {
        // $code = (int) $code;
        // if ($code < 100 || $code > 599) {
        //     $code = 400;
        // }

        $response = [
            'status' => false,
            'message' => $message,
        ];

        if (!is_null($errorDetails)) {
            $response['error'] = $errorDetails;
        }

        return response()->json($response, $code);
    }
}
