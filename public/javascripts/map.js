mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: campground.geometry.coordinates,
    zoom: 10
});

// Set marker options.
const marker = new mapboxgl.Marker({
    draggable: false
}).setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${campground.title}</h4><p>${campground.location}</p>`)
)
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());