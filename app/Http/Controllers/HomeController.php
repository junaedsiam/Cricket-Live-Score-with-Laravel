<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        return view('live');
    }
    public function fetchFromApi(){
        $url = "https://www.cricbuzz.com/match-api/livematches.json";
        $client = new \GuzzleHttp\Client([
            'verify'=>base_path('cacert.pem')
        ]);
        $request = $client->get($url);
        $response = $request->getBody()->getContents();
        return $response;
    }
}
