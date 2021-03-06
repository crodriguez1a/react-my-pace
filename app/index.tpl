<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>My Pace</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#ff8554">
    <link rel="stylesheet" href="assets/bulma.min.css" />
    <link rel="stylesheet" href="assets/vendor.min.css" />
    <link rel="stylesheet" href="assets/app.min.css" />
  </head>
  <body>

    <main class="mp-bulma">
      <section class="section" id="theme">
        <div class="radial-progress">
          <div class="progress-clock" id="progress-clock"></div>
          <div class="task-count" id="task-count"></div>
          <div class="rest-duration" id="rest-duration"></div>
          <div class="progress-bar" id="progress-bar"></div>
        </div>
        <div class="progress-controls" id="progress-controls"></div>
        <div class="theme-picker hide" id="theme-picker"></div>
        <div class="controls">
          <div class="routine container content">
            <div class="control routine-form" id="routine-form"></div>
          <div>
        </div>
      </section>
      <footer class="footer">
        <div class="container">
          <div class="content is-text-centered">
            <ul>
              <li><a href="https://github.com/crodriguez1a/react-my-pace" target="_blank" class="icon"><i class="fa fa-github"></i></a></li>
              <li><a href="mailto:crodriguez1a@gmail.com" target="_blank" class="icon"><i class="fa fa-envelope-o"></i></a></li>
              <li><a href="http://opensource.org/licenses/mit-license.php" target="_blank" class="icon mit">MIT</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>

    <% if (env === 'production') { %>
      <script src="assets/vendor.min.js"></script>
      <script src="assets/app.min.js"></script>
    <% } else { %>
      <script src="assets/vendor.js"></script>
      <script src="assets/app.js"></script>
      <script src="//localhost:35729/livereload.js"></script>
    <% } %>
  </body>
</html>
