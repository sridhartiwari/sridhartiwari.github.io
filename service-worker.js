var CACHE_NAME = 'pages1';
var filesToCache = [
'/images/img_1.jpg',
'/images/img_2.jpg',
'/images/img_3.jpg',
'/images/img_4.jpg',
'/images/img_5.jpg',
'/images/img_6.jpg',
'/images/img_bg_1.jpg',
'/images/img_bg_2.jpg',
'/images/img_bg_3.jpg',
'/images/diamond-03.jpg',
'/css/animate.css',
'/css/bootstrap.css',
'/css/flexslider.css',
'/css/icomoon.css',
'/css/magnific-popup.css',
'/owl.carousel.min.css',
'/css/owl.theme.default.min.css',
'/css/style.css',
'/css/themify-icons.css',
'/js/bootstrap.min.js',
'/js/jquery.countTo.js',
'/js/jquery.easing.1.3.js',
'/js/jquery.flexslider-min.js',
'/js/jquery.magnific-popup.min.js',
'/js/jquery.min.js',
'/js/jquery.stellar.min.js',
'/js/jquery.waypoints.min.js',
'/js/magnific-popup-options.js',
'/js/main.js',
'/js/modernizr-2.6.2.min.js',
'/js/owl.carousel.min.js',
'/js/respond.min.js',
'/js/script.js',
'/ubeasa.jpg',
'/index.html'
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


//self.addEventListener('activate', function(e) {
//  console.log('[ServiceWorker] Activate');
//    
//  e.waitUntil(
//    caches.keys().then(function(keyList) {
//      return Promise.all(keyList.map(function(key) {
//        if (key !== cacheName) {
//          console.log('[ServiceWorker] Removing old cache', key);
//          return caches.delete(key);
//        }
//      }));
//    })
//  );
//       
//  return self.clients.claim();
//});


//self.addEventListener('fetch', function(e) {
//  /*console.log('[ServiceWorker] Fetch', e.request.url);*/
//  e.respondWith(
//    caches.match(e.request).then(function(response) {
//        
////        var fetchPromise=fetch(e.request).then(function(networkResponse){
////            if(networkResponse){
////                cache.put(e.request,networkResponse.clone());
////            }
////            return networkResponse;
////        },function(e){
////            
////        });
//      return response || fetch(e.request);
//    })
//  );
//});


self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
            //console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                
                if (networkResponse) {
                   
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                
                
            });

            // respond from the cache, or the network
            return response || fetchPromise;
        });
    }));
});