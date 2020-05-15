<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Live Score</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
  <link rel="stylesheet" href="{{asset('css/style.css')}}">
</head>
<body>
  <section class="upper-bg"></section>
  <section class="section-main">
    <h1>Live Cricket Score</h1>
    <div id="score-list">
     
    </div>
  </section>
 
  <script src="{{asset('js/script.js')}}"></script>
</body>
</html>