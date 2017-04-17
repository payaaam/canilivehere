1) Save 5 closest locations
2) Make API Directions call for walking / driving
3) Save in state
4) Load chipotle spinning logo while its making the requests


UX
Present user with dialogue in the center of screen
 - Use Current location
 - Enter address

 Can I live here?
 Enter an address to see if its habitable.




 Scale from 1 - 10

 1 - 6.
You need to look elsewhere. The UN says being within 10 minutes driving or 
walking is a basic human right, much like the water and free speech.
 - Picture of a Burrito falling apart?


7 - 10
Fuck yeah you can live  here. Sign the lease immediately. You are within 10 minutes walking / driving of chipotle.
 - Show closest chipotle on map and print out directions.



Display Yes you can live here in top right corner because you are X minutes away



COLORS
// Red
//155 17 13
// #9B110D
// 
// Dark Brown
// 53 16 0
// #351000
// 
// Light Brown
// 47 29 22
// #2F1D16
// 
// Beige
// 135 115 97
// #717361
{
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
        {
            "color": "#9B110D"
        }
    ]
  }

IDEA: heatmap near and around chipotle



// store
{
  modals: {
    showSearchModal: true,
    showDecisionModal: false
  }
  homeLocation: {
    center: {
      lat: action.coordinates.latitude,
      lng: action.coordinates.longitude
    },
    marker:{},
    bounds: null
  },
  chipotleLocations: {
    loadingMessage: 'Calculating your location...',
    isFetching: true,
    decision: {
      habitable: true,
      closestPlaceId: ChIJIfBAsjeuEmsRdgu9Pl1Ps48
    }
    locations: [
      {
        rankByDistance: 1,
        distance: {
          walking: {
            distance: '0.7m',
            duration: '7 mins'
          },
          driving: {
            distance: '0.1m',
            duration: '5 mins'
          }
        },
        directions: DIRECTIONS_OBJECT
        location : {
          lat : -33.867217,
          lng : 151.195939
        },
        placeId: 'ChIJIfBAsjeuEmsRdgu9Pl1Ps48',
        address: '680 6th Ave, New York, NY 10010, United States',
        id: '7eaf747a3f6dc078868cd65efc8d3bc62fff77d7'
      },
      {
        rankByDistance: 2,
        distance: {
          driving: '',
          walking: ''
        },
        location : {
          lat : -33.866786,
          lng : 151.195633
        },
        placeId: 'ChIJ5xQ7szeuEmsRs6Kj7YFZE9k',
        address: '504 6th Ave, New York, NY 10011, United States',
        id: '7eaf747a3f6dc078868cd65efc8d3bc62fff77d7'
      },
      ...
    ]
  }
}



// Places API Response
// https://developers.google.com/places/web-service/search
{
   "html_attributions" : [],
   "next_page_token" : "CpQCAgEAAFxg8o-eU7_uKn7Yqjana-HQIx1hr5BrT4zBaEko29ANsXtp9mrqN0yrKWhf-y2PUpHRLQb1GT-mtxNcXou8TwkXhi1Jbk-ReY7oulyuvKSQrw1lgJElggGlo0d6indiH1U-tDwquw4tU_UXoQ_sj8OBo8XBUuWjuuFShqmLMP-0W59Vr6CaXdLrF8M3wFR4dUUhSf5UC4QCLaOMVP92lyh0OdtF_m_9Dt7lz-Wniod9zDrHeDsz_by570K3jL1VuDKTl_U1cJ0mzz_zDHGfOUf7VU1kVIs1WnM9SGvnm8YZURLTtMLMWx8-doGUE56Af_VfKjGDYW361OOIj9GmkyCFtaoCmTMIr5kgyeUSnB-IEhDlzujVrV6O9Mt7N4DagR6RGhT3g1viYLS4kO5YindU6dm3GIof1Q",
   "results" : [
      {
         "geometry" : {
            "location" : {
               "lat" : -33.867217,
               "lng" : 151.195939
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
         "id" : "7eaf747a3f6dc078868cd65efc8d3bc62fff77d7",
         "name" : "Biaggio Cafe - Pyrmont",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 600,
               "html_attributions" : [],
               "photo_reference" : "CnRnAAAAmWmj0BqA0Jorm1_vjAvx1n6c7ZNBxyY-U9x99-oNyOxvMjDlo2npJzyIq7c3EK1YyoNXdMFDcRPzwLJtBzXAwCUFDGo_RtLRGBPJTA2CoerPdC5yvT2SjfDwH4bFf5MrznB0_YWa4Y2Qo7ABtAxgeBIQv46sGBwVNJQDI36Wd3PFYBoUTlVXa0wn-zRITjGp0zLEBh8oIBE",
               "width" : 900
            }
         ],
         "place_id" : "ChIJIfBAsjeuEmsRdgu9Pl1Ps48",
         "scope" : "GOOGLE",
         "price_level" : 1,
         "rating" : 3.4,
         "reference" : "CoQBeAAAAGu0wNJjuZ40DMrRe3mpn7fhlfIK1mf_ce5hgkhfM79u-lqy0G2mnmcueTq2JGWu9wsgS1ctZDHTY_pcqFFJyQNV2P-kdhoRIeYRHeDfbWtIwr3RgFf2zzFBXHgNjSq-PSzX_OU6OT2_3dzdhhpV-bPezomtrarW4DsGl9uh773yEhDJT6R3V8Fyvl_xeE761DTCGhT1jJ3floFI5_c-bHgGLVwH1g-cbQ",
         "types" : [ "cafe", "bar", "restaurant", "food", "establishment" ],
         "vicinity" : "48 Pirrama Rd, Pyrmont"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : -33.866786,
               "lng" : 151.195633
            }
         },
         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
         "id" : "3ef986cd56bb3408bc1cf394f3dad9657c1d30f6",
         "name" : "Doltone House",
         "photos" : [
            {
               "height" : 1260,
               "html_attributions" : [ "From a Google User" ],
               "photo_reference" : "CnRwAAAAeM-aLqAm573T44qnNe8bGMkr_BOh1MOVQaA9CCggqtTwuGD1rjsviMyueX_G4-mabgH41Vpr8L27sh-VfZZ8TNCI4FyBiGk0P4fPxjb5Z1LrBZScYzM1glRxR-YjeHd2PWVEqB9cKZB349QqQveJLRIQYKq2PNlOM0toJocR5b_oYRoUYIipdBjMfdUyJN4MZUmhCsTMQwg",
               "width" : 1890
            }
         ],
         "place_id" : "ChIJ5xQ7szeuEmsRs6Kj7YFZE9k",
         "scope" : "GOOGLE",
         "reference" : "CnRvAAAA22k1PAGyDxAgHZk6ErHh_h_mLUK_8XNFLvixPJHXRbCzg-gw1ZxdqUwA_8EseDuEZKolBs82orIQH4m6-afDZV9VcpggokHD9x7HdMi9TnJDmGb9Bdh8f-Od4DK0fASNBL7Me3CsAWkUMWhlNQNYExIQ05W7VbxDTQe2Kh9TiL840hoUZfiO0q2HgDHSUyRdvTQx5Rs2SBU",
         "types" : [ "food", "establishment" ],
         "vicinity" : "48 Pirrama Rd, Pyrmont"
      },
      {
         "aspects" : [
            {
               "rating" : 23,
               "type" : "overall"
            }
         ],
      ...
   ],
   "status" : "OK"
}

// Markers Search
https://developers.google.com/maps/documentation/javascript/markers#complex_icons
http://stackoverflow.com/questions/23219410/custom-google-maps-marker-from-sprite-and-retina-proof

// Marker
{
  position: {
    lat: 40.747917,
    lng: -74.000169,
  },
  key: 'Home',
  defaultAnimation: 2,
  icon: {
    url: 'https://cdn0.iconfinder.com/data/icons/layout-and-location/24/Untitled-2-01-128.png',
    size: new google.maps.Size(60, 60),
    scaledSize: new google.maps.Size(30, 30)
  }


}
//let placesApiSearch = `${PLACES_BASE_URL}?query=chipotle&location=${lat},${lng}&key=${config.googleMapsApiKey}`
const PLACES_BASE_URL ='https://maps.googleapis.com/maps/api/place/textsearch/json';