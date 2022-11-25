import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet"
import {useMap} from "react-leaflet";


export default function CreateIndoor(props) {
    const map = useMap()

    var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    osm.addTo(map);
    var options = {
        maxZoom: 20,
        tolerance: 3,
        debug: 0,
        style: {
            fillColor: "#1EB300",
            color: "#F2FF00",
        },
    };

    var street = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.1155106,
                            31.54516572
                        ],
                        [
                            -97.11557178,
                            31.54520693
                        ]
                    ]
                },

                "id": "959b7493-b6ae-4be6-bcb4-f6576c423ea2",
                "properties": {
                    "name": "",
                    "strokeColor": "#FF0000"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11559166,
                            31.54510474
                        ],
                        [
                            -97.11564382,
                            31.54515482
                        ],
                        [
                            -97.11541763,
                            31.54531844
                        ],
                        [
                            -97.11535188,
                            31.54528258
                        ]
                    ]
                },
                "id": "56af7a78-b1a9-42bc-95c8-0d4c455625dc",
                "properties": {
                    "name": "aaaa",
                    "strokeColor": "#FF0000"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11566463,
                            31.54529749
                        ],
                        [
                            -97.1157386,
                            31.5453454
                        ]
                    ]
                },
                "id": "59006da9-60b0-4299-8718-d25fcb0a6429",
                "properties": {
                    "name": "bbb",
                    "strokeColor": "#FF0000"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11486269,
                            31.54496205
                        ],
                        [
                            -97.11491529,
                            31.54500688
                        ],
                        [
                            -97.11485217,
                            31.54508085
                        ]
                    ]
                },
                "id": "3d00711c-d18f-4e57-ac08-a8fc254f209c",
                "properties": {
                    "name": "",
                    "strokeColor": "#FF0000"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11512347,
                            31.54529771
                        ],
                        [
                            -97.11502705,
                            31.5453661
                        ]
                    ]
                },
                "id": "12a9f07e-a057-4dc0-acf5-51e54977fcaa",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11537432,
                            31.54508702
                        ],
                        [
                            -97.1152248,
                            31.54518526
                        ]
                    ]
                },
                "id": "180011d3-19ec-4875-82fc-347f477ffe95",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11544944,
                            31.54515533
                        ],
                        [
                            -97.11531495,
                            31.5452543
                        ]
                    ]
                },
                "id": "093673c3-3d0d-4f6b-a7d0-0fc8313183af",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11571055,
                            31.54501531
                        ],
                        [
                            -97.11581625,
                            31.5451099
                        ]
                    ]
                },
                "id": "16fbcc69-2056-494c-a2ec-419ad5c5431e",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11553636,
                            31.54539835
                        ],
                        [
                            -97.11561298,
                            31.5454514
                        ]
                    ]
                },
                "id": "86ee326f-0822-4610-9b00-44ae19436b81",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11560465,
                            31.54534465
                        ],
                        [
                            -97.11568174,
                            31.54539338
                        ]
                    ]
                },
                "id": "78299f43-7b93-4c60-8db3-013e22dd873b",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11571697,
                            31.54525634
                        ],
                        [
                            -97.11578488,
                            31.54530634
                        ]
                    ]
                },
                "id": "0b1e03e6-494f-440b-99ed-5ee218244a94",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11503587,
                            31.54528703
                        ],
                        [
                            -97.11499682,
                            31.54525344
                        ],
                        [
                            -97.11510991,
                            31.54517051
                        ],
                        [
                            -97.11542552,
                            31.54541706
                        ],
                        [
                            -97.1157385,
                            31.54520637
                        ],
                        [
                            -97.1157221,
                            31.54517936
                        ]
                    ]
                },
                "id": "42cef824-6ec2-4255-80e1-17d1eacb7386",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11598836,
                            31.54513464
                        ],
                        [
                            -97.11545445,
                            31.54558517
                        ],
                        [
                            -97.11531243,
                            31.54545517
                        ],
                        [
                            -97.1152046,
                            31.54553361
                        ],
                        [
                            -97.1153361,
                            31.54565689
                        ],
                        [
                            -97.11515989,
                            31.54578914
                        ],
                        [
                            -97.11467858,
                            31.54536103
                        ],
                        [
                            -97.11487058,
                            31.54520189
                        ],
                        [
                            -97.11493107,
                            31.54525344
                        ],
                        [
                            -97.11499156000001,
                            31.54520637
                        ],
                        [
                            -97.11485217,
                            31.54508085
                        ],
                        [
                            -97.1148285,
                            31.5451055
                        ],
                        [
                            -97.11473907,
                            31.5450293
                        ],
                        [
                            -97.11483113,
                            31.54494412
                        ],
                        [
                            -97.11486269,
                            31.54496205
                        ],
                        [
                            -97.11520197,
                            31.54467291
                        ],
                        [
                            -97.11517041,
                            31.54463705
                        ],
                        [
                            -97.1153098,
                            31.54454291
                        ],
                        [
                            -97.11549391,
                            31.54469756
                        ],
                        [
                            -97.11546234,
                            31.54472446
                        ],
                        [
                            -97.11580688,
                            31.54503154
                        ],
                        [
                            -97.11583844,
                            31.5450024
                        ],
                        [
                            -97.11599362,
                            31.54514585
                        ]
                    ]
                },
                "id": "9c59b493-39e5-4dee-97fa-3cef000f2a19",
                "properties": {
                    "C318": "",
                    "name": "C318",
                    "Hankamer": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11494422,
                            31.54489257
                        ],
                        [
                            -97.11522038,
                            31.54511895
                        ],
                        [
                            -97.11559627,
                            31.54484382
                        ]
                    ]
                },
                "id": "a096238e-3823-48e4-9e90-1496070de7c6",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11541729,
                            31.54512609
                        ],
                        [
                            -97.11527393,
                            31.54522289
                        ]
                    ]
                },
                "id": "b0ab6b0f-d095-4807-b5c1-4a12a0ea2d1c",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11575292,
                            31.54498344
                        ],
                        [
                            -97.11548338,
                            31.5451862
                        ],
                        [
                            -97.11532512,
                            31.54504229
                        ]
                    ]
                },
                "id": "76664857-c40a-434c-95fa-7a70e85fb63c",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11539793,
                            31.54524882
                        ],
                        [
                            -97.11544719,
                            31.54529706
                        ]
                    ]
                },
                "id": "65c5bb04-964a-4549-aebc-bcbf2640d47d",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11593105,
                            31.54508801
                        ],
                        [
                            -97.11547549,
                            31.5454462
                        ],
                        [
                            -97.11554958,
                            31.5455049
                        ]
                    ]
                },
                "id": "79a5afce-a6a1-4031-9e59-a327af4439b2",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11577018,
                            31.5452145
                        ],
                        [
                            -97.11584034,
                            31.54525955
                        ]
                    ]
                },
                "id": "73d821c2-fd06-4891-86ec-c76675a19ae9",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11548338,
                            31.5451862
                        ],
                        [
                            -97.11553221,
                            31.54523555
                        ]
                    ]
                },
                "id": "48bc4a68-58b3-4a3d-b935-fefe3996c527",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.115436,
                            31.54522092
                        ],
                        [
                            -97.11548264,
                            31.54527142
                        ]
                    ]
                },
                "id": "481cf384-74a9-4640-8b58-13603d80d760",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11588928,
                            31.54512086
                        ],
                        [
                            -97.11594473,
                            31.54517146
                        ]
                    ]
                },
                "id": "438ce3b0-2bdf-429a-99be-04d0b1ffe7aa",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.115174,
                            31.54533981
                        ],
                        [
                            -97.11507972,
                            31.54541579
                        ]
                    ]
                },
                "id": "f1d16d84-c498-4ba5-93c0-b0f89bd3c166",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11589327,
                            31.54505308
                        ],
                        [
                            -97.11568853,
                            31.54520413
                        ],
                        [
                            -97.11564382,
                            31.54515482
                        ]
                    ]
                },
                "id": "d471bf48-79b0-4776-95d3-5b6d4340c8bf",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11565359,
                            31.54505816
                        ],
                        [
                            -97.11576146,
                            31.54515032
                        ]
                    ]
                },
                "id": "e939d912-47c0-41d6-9dd1-b601420ec9ef",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11583027,
                            31.54516725
                        ],
                        [
                            -97.11589053,
                            31.5452172
                        ]
                    ]
                },
                "id": "f9c401a1-0770-4b66-b06b-a7b1fc0ada9b",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11548338,
                            31.5451862
                        ],
                        [
                            -97.11535188,
                            31.54528258
                        ],
                        [
                            -97.11517041,
                            31.54514361
                        ],
                        [
                            -97.11522038,
                            31.54511895
                        ]
                    ]
                },
                "id": "25a07551-d95b-4579-a103-47ad40dce914",
                "properties": {
                    "name": ""
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -97.11531243,
                            31.54545517
                        ],
                        [
                            -97.11507572,
                            31.54525792
                        ],
                        [
                            -97.11498367,
                            31.54532516
                        ],
                        [
                            -97.1152046,
                            31.54553361
                        ]
                    ]
                },
                "id": "c59f41d4-f041-4206-bb02-f4b828bfa56b",
                "properties": {
                    "name": ""
                }
            }
        ]
    }

    var pointA = new L.LatLng(31.54553361,-97.1152046,);
    var pointB = new L.LatLng(
        31.54505308,-97.11589327);
    var pointList = [pointA, pointB];

    var firstpolyline = new L.Polyline(pointList, {
        color: 'red',
        weight: 3,
        smoothFactor: 1
    }).addTo(map);

    L.geoJson(street, options).addTo(map);
return null;

};
