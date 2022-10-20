import icons from "./icons.js";

const lngRange = 0.025;
const latRange = 0.025;

export default canada = {
  lng: -98.74,
  lat: 56.415,
  bbox: [-130, 65, -65, 47],
  provinces: {
    AB: {
      name: "Alberta",
      code: 48,
      term: "AB",
      concise: "PROV",
      coordinates: {
        lat: 55,
        lng: -115,
      },
      cities: {},
    },
    BC: {
      name: "British Columbia",
      code: 59,
      term: "BC",
      concise: "PROV",
      coordinates: {
        lat: 53.726_669,
        lng: -127.647_621,
      },
      cities: {
        places: {},
      },
    },
    MB: {
      name: "Manitoba",
      code: 46,
      term: "MB",
      concise: "PROV",
      coordinates: {
        lat: 56.415_211,
        lng: -98.739_075,
      },
      cities: {
        places: {},
      },
    },
    NB: {
      name: "New Brunswick",
      code: 13,
      term: "NB",
      concise: "PROV",
      coordinates: {
        lat: 46.498_39,
        lng: -66.159_668,
      },
      cities: {
        places: {},
      },
    },
    NL: {
      name: "Newfoundland and Labrador",
      code: 10,
      term: "NL",
      concise: "PROV",
      coordinates: {
        lat: 53.135_509,
        lng: -57.660_435,
      },
      cities: {
        places: {},
      },
    },
    NS: {
      name: "Nova Scotia",
      code: 12,
      term: "NS",
      concise: "PROV",
      coordinates: {
        lat: 45,
        lng: -63,
      },
      cities: {
        places: {},
      },
    },
    ON: {
      name: "Ontario",
      code: 35,
      term: "ON",
      concise: "PROV",
      coordinates: {
        lat: 47.75,
        lng: -84.833_33,
      },
      cities: {
        Ottawa: {
          name: "Ottawa",
          places: {
            CDC: {
              name: "Carleton University",
              id: "CDC",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "19dc5ef9a24233ad4afb7d1302c22fdd",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-75.701_308_474_501_81, 45.378_852_504_951_45],
                          [-75.701_379_397_638_89, 45.379_809_013_360_84],
                          [-75.701_355_836_317_76, 45.380_306_301_242_88],
                          [-75.701_217_043_939_54, 45.380_908_372_566_41],
                          [-75.700_998_542_474_66, 45.381_450_056_900_064],
                          [-75.700_604_849_222_53, 45.382_116_410_554_23],
                          [-75.700_087_370_692_59, 45.382_740_714_944_276],
                          [-75.699_699_296_317_93, 45.383_175_040_095_466],
                          [-75.699_291_948_635_62, 45.383_712_779_319_21],
                          [-75.699_078_059_819_24, 45.384_291_893_323_31],
                          [-75.699_044_783_984_92, 45.384_976_025_836_72],
                          [-75.699_093_360_443_09, 45.385_480_292_511_06],
                          [-75.699_499_822_563_3, 45.386_802_404_198_42],
                          [-75.700_118_200_263_12, 45.388_785_316_229_05],
                          [-75.700_249_444_710_3, 45.389_305_140_728_14],
                          [-75.700_274_886_972_72, 45.389_913_266_598_825],
                          [-75.700_209_782_372_54, 45.390_320_257_103_326],
                          [-75.699_915_950_807_52, 45.391_030_301_325_26],
                          [-75.699_285_113_105_89, 45.391_768_615_479_89],
                          [-75.697_452_142_707_08, 45.393_020_281_133_09],
                          [-75.697_157_532_926_41, 45.392_807_190_595_9],
                          [-75.696_974_238_703_97, 45.392_731_520_039_945],
                          [-75.696_661_999_724_47, 45.392_711_812_808_64],
                          [-75.696_105_683_920_59, 45.392_699_181_398_57],
                          [-75.695_942_190_661_64, 45.392_611_178_597_49],
                          [-75.695_851_209_684_69, 45.392_403_681_003_6],
                          [-75.694_615_078_753_33, 45.390_665_902_083_98],
                          [-75.694_505_983_774_4, 45.390_383_927_163_384],
                          [-75.694_174_601_150_1, 45.390_002_176_438_74],
                          [-75.693_947_146_566_97, 45.389_700_333_565_94],
                          [-75.693_828_952_150_2, 45.389_667_131_942_19],
                          [-75.693_416_649_643_27, 45.389_191_421_075_566],
                          [-75.691_469_087_883_43, 45.386_604_835_848_43],
                          [-75.690_784_562_971_77, 45.385_769_988_059_224],
                          [-75.689_703_459_998_74, 45.384_380_532_804_244],
                          [-75.689_216_691_741_63, 45.383_641_859_163_16],
                          [-75.690_528_480_697_94, 45.383_386_344_671_38],
                          [-75.691_686_814_962_68, 45.383_137_202_864_05],
                          [-75.692_379_301_497_94, 45.383_126_369_212_846],
                          [-75.693_140_490_293_08, 45.382_788_959_730_05],
                          [-75.694_264_195_390_25, 45.382_408_293_196_73],
                          [-75.695_343_833_632_59, 45.382_040_244_235_895],
                          [-75.697_077_659_651_03, 45.381_467_128_071_99],
                          [-75.698_281_902_377_99, 45.380_572_722_923_63],
                          [-75.699_845_947_189_66, 45.379_314_470_090_83],
                          [-75.700_281_734_596_52, 45.378_869_263_613_92],
                          [-75.701_308_474_501_81, 45.378_852_504_951_45],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              coordinates: {
                lat: 45.384_35,
                lng: -75.694_35,
                msl: 80,
                zoom: 15,
              },
<<<<<<< HEAD
=======
              // Logo: "assets/ON/Ottawa/CDC/cu_logo.jfif",
>>>>>>> e8a9148 (Linting with xo)
              gltfPath: "assets/ON/Ottawa/CDC/glb/ON_Ottawa_CDC_",
              gltfMasses: {
                url: "assets/ON/Ottawa/CDC/glb/ON-Ottawa-cu-masses.glb",
              },
              objects: {
                MB: {
                  name: "Maintenance and Grounds Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-MAINTENANCE_AND_GROUNDS_BLDG-AS_FOUND.ifc",
                },
                AC: {
                  name: "Athletics Alumni and Fieldhouse",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ATHLETICS_ALUMNI_AND_FIELDHOUSE-AS_FOUND.ifc",
                },
                DT: {
                  name: "Dunton Tower",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-DUNTON_TOWER-AS_FOUND.ifc",
                },
                NB: {
                  name: "Nesbitt Biology Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-NESBITT_BIOLOGY_BLDG-AS_FOUND.ifc",
                },
                AA: {
                  name: "Building 22",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-BLDG_22-AS_FOUND.ifc",
                },
                AR: {
                  name: "Arise",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ARISE-AS_FOUND.ifc",
                },
                AP: {
                  name: "Azrieli Pavilion",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-AZRIELI_PAVILION-AS_FOUND.ifc",
                },
                AT: {
                  name: "Azrieli Theatre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-AZRIELI_THEATRE-AS_FOUND.ifc",
                },
                CB: {
                  name: "Canal Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-CANAL_BLDG-AS_FOUND.ifc",
                },
                HS: {
                  name: "Health Sciences Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-HEALTH_SCIENCES_BLDG-AS_FOUND.ifc",
                },
                HP: {
                  name: "Hezberg Laboratories",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-HEZBERG_LABORATORIES-AS_FOUND.ifc",
                },
                LA: {
                  name: "Loeb Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-LOEB_BLDG-AS_FOUND.ifc",
                },
                ME: {
                  name: "Mackenzie",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-MACKENZIE-AS_FOUND.ifc",
                },
                ML: {
                  name: "Macodrum Library",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-MACODRUM_LIBRARY-AS_FOUND.ifc",
                },
                MC: {
                  name: "Minto Centre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-MINTO_CENTRE-AS_FOUND.ifc",
                },
                NI: {
                  name: "Nicol Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-NICOL_BLDG-AS_FOUND.ifc",
                },
                PA: {
                  name: "Paterson Hall",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-PATERSON_HALL-AS_FOUND.ifc",
                },
                RB: {
                  name: "River Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-RIVER_BLDG-AS_FOUND.ifc",
                },
                SR: {
                  name: "Social Sciences Research Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-SOCIAL_SCIENCES_RESEARCH_BLDG-AS_FOUND.ifc",
                },
                SA: {
                  name: "Southam Hall and Kailash Mital Theatre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-SOUTHAM_HALL_AND_KAILASH_MITAL_THEATRE-AS_FOUND.ifc",
                },
                SC: {
                  name: "Steacie Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-STEACIE_BLDG-AS_FOUND.ifc",
                },
                SD: {
                  name: "Stormont and Dundas House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-STORMONT_AND_DUNDAS_HOUSE-AS_FOUND.ifc",
                },
                TB: {
                  name: "Tory Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-TORY_BLDG-AS_FOUND.ifc",
                },
                UC: {
                  name: "University Centre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-UNIVERSITY_CENTRE-AS_FOUND.ifc",
                },
                VS: {
                  name: "Vsim Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-VSIM_BLDG-AS_FOUND.ifc",
                },
                FR: {
                  name: "Frontenac House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-FRONTENAC_HOUSE-AS_FOUND.ifc",
                },
                GH: {
                  name: "Glengarry House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-GLENGARRY_HOUSE-AS_FOUND.ifc",
                },
                LH: {
                  name: "Lanark House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-LANARK_HOUSE-AS_FOUND.ifc",
                },
                LE: {
                  name: "Leeds House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-LEEDS_HOUSE-AS_FOUND.ifc",
                },
                LX: {
                  name: "Lennox and Addington House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-LENNOX_AND_ADDINGTON_HOUSE-AS_FOUND.ifc",
                },
                PH: {
                  name: "Prescott House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-PRESCOTT_HOUSE-AS_FOUND.ifc",
                },
                RH: {
                  name: "Renfrew House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-RENFREW_HOUSE-AS_FOUND.ifc",
                },
                CO: {
                  name: "Residence Commons",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-RESIDENCE_COMMONS-AS_FOUND.ifc",
                },
                RU: {
                  name: "Russell and Grenville House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-RUSSELL_AND_GRENVILLE_HOUSE-AS_FOUND.ifc",
                },
                SP: {
                  name: "St Patricks Building",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ST_PATRICKS_BLDG-AS_FOUND.ifc",
                },
                IH: {
                  name: "Ice House",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ICE_HOUSE-AS_FOUND.ifc",
                },
                TC: {
                  name: "Tennis Centre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-TENNIS_CENTRE-AS_FOUND.ifc",
                },
                PG9: {
                  name: "Parking Garage P9",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-PARKING_GARAGE_P9-AS_FOUND.ifc",
                },
                PG: {
                  name: "Parking Garage P18",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-PARKING_GARAGE_P18-AS_FOUND.ifc",
                },
                SS: {
                  name: "Bronson Sub-Station",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-BRONSON_SUB-STATION-AS_FOUND.ifc",
                },
                TT: {
                  name: "CTTC Bldg",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-CTTC_BLDG-AS_FOUND.ifc",
                },
                UH: {
                  name: "CHEER",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-CHEER-AS_FOUND.ifc",
                },
                CC: {
                  name: "Colonel By Child Care Centre",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-COLONEL_BY_CHILD_CARE_CENTRE-AS_FOUND.ifc",
                },
                RO: {
                  name: "Robertson Hall",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ROBERTSON_HALL-AS_FOUND.ifc",
                },
              },
              context: {
                Z1: {
                  name: "Exterior Zone 1",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-EXTERIOR_ZONE_1-AS_FOUND.ifc",
                },
                Z2: {
                  name: "Exterior Zone 2",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-EXTERIOR_ZONE_2-AS_FOUND.ifc",
                },
                Z3: {
                  name: "Exterior Zone 3",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-EXTERIOR_ZONE_3-AS_FOUND.ifc",
                },
                Z4: {
                  name: "Exterior Zone 4",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-EXTERIOR_ZONE_4-AS_FOUND.ifc",
                },
                RD: {
                  name: "Roads",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-ROADS-AS_FOUND.ifc",
                },
                TU: {
                  name: "Tunnels",
                  ifcFileName:
                    "CDC-CIMS-FEDERATED_BLDGS-SUST-CIMS-DOC-TUNNELS-AS_FOUND.ifc",
                },
              },
              ifcPath: "assets/ON/Ottawa/CDC/ifc/",
              jsonPropertiesPath: "assets/ON/Ottawa/CDC/json/ON_Ottawa_CDC_",
            },
            PB: {
              name: "Parliament Buildings",
              id: "PB",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "831f9f555ad3d8115f769ca78c465561",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-75.700_584_674_518_88, 45.422_600_362_342_34],
                          [-75.696_185_950_515_83, 45.424_634_511_219_125],
                          [-75.697_643_154_628_44, 45.425_839_176_485_795],
                          [-75.699_410_098_821_06, 45.426_708_481_604_12],
                          [-75.702_030_585_458_46, 45.425_548_388_065_494],
                          [-75.701_840_529_966_06, 45.423_475_113_506_95],
                          [-75.700_584_674_518_88, 45.422_600_362_342_34],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              coordinates: {
                lat: 45.425_21,
                lng: -75.700_11,
                msl: 85,
                zoom: 16,
              },
              gltfMasses: {
                url: "assets/ON/Ottawa/PB/glb/ON-Ottawa-PB.glb",
              },
              ifcPath: "assets/ON/Ottawa/PB/objects/",
              gltfPath: "assets/ON/Ottawa/PB/glb/ON_Ottawa_PB_",
              jsonPropertiesPath: "assets/ON/Ottawa/PB/json/ON_Ottawa_PB_",
              objects: {
                CB: {
                  name: "Centre Block",
                },
                EB: {
                  name: "East Block",
                },
                LOP: {
                  name: "Library of Parliament",
                },
                PT: {
                  name: "Peace Tower",
                  ifcFileName: "ON-Ottawa-PB-PT.ifc",
                },
                WB: {
                  name: "West Block",
                },
              },
            },
            HM: {
              name: "Holocaust Memorial",
              id: "HM",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "307f55f714e878dde104d8973136b51e",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-75.714_915_901_786_72, 45.416_980_028_453_48],
                          [-75.714_647_669_183_12, 45.416_553_938_547_17],
                          [-75.714_574_068_516_01, 45.416_545_579_125_91],
                          [-75.714_223_639_920_23, 45.416_755_971_268],
                          [-75.714_014_122_131_22, 45.416_936_052_526_04],
                          [-75.713_822_265_535_47, 45.417_195_114_329_56],
                          [-75.713_904_923_943_25, 45.417_246_908_692_36],
                          [-75.714_915_901_786_72, 45.416_980_028_453_48],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              coordinates: {
                lat: 45.416_81,
                lng: -75.714_48,
                msl: 56.1,
                zoom: 18,
              },
              logo: "assets/ON/Ottawa/HM/ncc-logo.jpg",
              gltfMasses: {
                url: "assets/ON/Ottawa/HM/glb/ON-Ottawa-HM.glb",
              },
              ifcPath: "assets/ON/Ottawa/HM/objects/HM/ifc/",
              gltfPath: "assets/ON/Ottawa/HM/glb/ON_Ottawa_HM_",
              jsonPropertiesPath: "assets/ON/Ottawa/HM/json/ON_Ottawa_HM_",
              objects: {
                HM: {
                  name: "Holocaust Memorial",
                  ifcFileName: "ON-Ottawa-HM.ifc",
                },
              },
            },
            /*CWM: {
              name: "Canadian War Museum",
              id: "CWM",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "a81013213db16dc5e252535b2ee7df8a",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-75.719_101_176_840_25, 45.416_158_814_682_234],
                          [-75.718_224_070_785_01, 45.416_376_111_222_15],
                          [-75.716_975_218_599_93, 45.416_717_990_040_75],
                          [-75.716_002_298_602_72, 45.416_865_959_431_846],
                          [-75.715_377_218_150_65, 45.417_102_863_913_98],
                          [-75.715_701_152_693_57, 45.417_820_013_568_84],
                          [-75.716_105_904_250_6, 45.418_030_900_545_83],
                          [-75.716_852_438_721_9, 45.417_922_629_637_985],
                          [-75.717_887_219_904_61, 45.417_721_374_052_945],
                          [-75.718_056_744_758_73, 45.417_606_456_550_8],
                          [-75.718_179_544_778_61, 45.417_343_705_671_36],
                          [-75.718_870_199_518_22, 45.416_961_378_894_09],
                          [-75.719_081_122_824_26, 45.416_891_356_119_21],
                          [-75.719_069_402_222_42, 45.416_722_871_131_554],
                          [-75.718_987_366_706_84, 45.416_591_458_615_19],
                          [-75.719_101_176_840_25, 45.416_158_814_682_234],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              coordinates: {
                lat: 45.417_240_8,
                lng: -75.717_29,
                msl: 56.1,
                zoom: 17,
              },
              logo: "assets/ON/Ottawa/CWM/cwm-logo.png",
              gltfMasses: {
                url: "assets/ON/Ottawa/CWM/glb/ON-Ottawa-CWM.glb",
              },
              gltfPath: "assets/ON/Ottawa/CWM/glb/ON_Ottawa_CWM_",
              jsonPropertiesPath: "assets/ON/Ottawa/CWM/json/ON_Ottawa_CWM_",
              objects: {
                CWM: {
                  name: "Canadian War Museum",
                },
              },
            },*/
            NAC: {
              name: "National Art Centre",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "6a8c00c7e3209902e7d0dd4e287de0c8",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-75.693_980_233_754_3, 45.422_630_144_827_96],
                          [-75.693_383_352_452_56, 45.422_663_711_094_2],
                          [-75.693_352_990_518_19, 45.422_753_576_484_72],
                          [-75.692_202_650_270_06, 45.423_269_568_441_754],
                          [-75.692_196_451_046_98, 45.423_342_904_079_73],
                          [-75.692_928_267_620_99, 45.423_640_855_725_694],
                          [-75.693_128_060_706_46, 45.423_585_059_598_196],
                          [-75.693_729_839_898_3, 45.423_876_284_037_25],
                          [-75.694_635_218_240_39, 45.423_890_345_663_665],
                          [-75.694_599_731_928_58, 45.423_462_434_446_95],
                          [-75.694_679_284_039_64, 45.423_424_301_769_64],
                          [-75.693_980_233_754_3, 45.422_630_144_827_96],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              coordinates: {
                lat: 45.423_911_681_545_06,
                lng: -75.693_510_752_303_75,
                msl: 53,
                zoom: 16,
              },
              logo: "assets/ON/Ottawa/NAC/nac-logo.jpg",
            },
          },
          layers: {
            busStops: setLayer(
              "busStops",
              "OCTranspo bus stops",
              "assets/ON/Ottawa/json/ON-Ottawa-busStops.json",
              "#CE343B",
              ocTranspo
            ),
            trees: setLayer(
              "trees",
              "Ottawa trees",
              "assets/ON/Ottawa/json/ON-Ottawa-trees.json",
              "green",
              ottawaTrees
            ),
          },
        },
        Toronto: {
          name: "Toronto",
          places: {
            DA: {
              name: "Downsview Airport",
              id: "DA",
              placeGeojson: {
                type: "FeatureCollection",
                features: [
                  {
                    id: "bbff1e2cf048645e60439b4c522a1dc6",
                    type: "Feature",
                    properties: {},
                    geometry: {
                      coordinates: [
                        [
                          [-79.474_083_587_309_12, 43.732_900_377_228_45],
                          [-79.469_701_506_845_37, 43.733_904_669_941_61],
                          [-79.470_153_491_187_4, 43.735_496_883_169_276],
                          [-79.469_588_974_179_98, 43.735_670_386_335_07],
                          [-79.469_518_465_471_61, 43.735_894_778_860_086],
                          [-79.469_659_755_601_44, 43.736_669_706_957_97],
                          [-79.468_770_950_677_24, 43.736_812_412_938_63],
                          [-79.468_235_018_545_46, 43.737_107_980_275_226],
                          [-79.467_938_818_116_65, 43.737_179_315_739_13],
                          [-79.468_263_775_736_4, 43.737_933_234_334_21],
                          [-79.465_607_925_178_63, 43.738_647_382_179_61],
                          [-79.464_474_728_333_3, 43.738_735_848_175_42],
                          [-79.463_794_274_306_42, 43.738_497_024_811_75],
                          [-79.459_292_078_941_35, 43.734_445_351_865_08],
                          [-79.458_947_801_387_3, 43.733_786_466_408_22],
                          [-79.458_328_181_273_22, 43.733_786_371_608_886],
                          [-79.457_392_450_244_91, 43.733_073_120_879_17],
                          [-79.456_691_282_550_89, 43.732_714_017_697_87],
                          [-79.452_987_555_011_38, 43.733_467_874_718_23],
                          [-79.453_025_316_490_84, 43.734_013_573_540_95],
                          [-79.452_836_509_092_69, 43.734_231_851_677_66],
                          [-79.457_179_918_125_92, 43.738_250_270_665_56],
                          [-79.462_939_547_789_36, 43.743_472_742_484_414],
                          [-79.460_986_032_209_16, 43.744_910_586_274_13],
                          [-79.464_938_840_957_94, 43.748_776_361_639_415],
                          [-79.465_414_792_284_55, 43.749_261_191_134_71],
                          [-79.465_674_949_086_15, 43.749_559_840_240_78],
                          [-79.468_025_380_831_02, 43.749_099_421_300_286],
                          [-79.469_441_144_601_2, 43.748_873_123_369_04],
                          [-79.474_356_556_500_91, 43.753_543_793_783_734],
                          [-79.474_383_836_027_03, 43.755_497_891_711_826],
                          [-79.475_304_082_010_27, 43.755_380_895_820_11],
                          [-79.481_143_630_269_24, 43.754_012_625_974_866],
                          [-79.482_602_963_027_9, 43.753_035_415_638_095],
                          [-79.482_822_656_214_81, 43.750_532_316_327_565],
                          [-79.482_606_886_906_95, 43.748_487_576_655_606],
                          [-79.482_166_600_244_31, 43.746_474_509_797_196],
                          [-79.479_899_701_170_17, 43.746_792_233_139_786],
                          [-79.479_145_984_834_47, 43.745_174_397_594_1],
                          [-79.476_928_166_401_44, 43.745_620_623_701_74],
                          [-79.474_083_587_309_12, 43.732_900_377_228_45],
                        ],
                      ],
                      type: "Polygon",
                    },
                  },
                ],
              },
              location: "ON-TO-DA",
              coordinates: {
                lat: 43.735_19,
                lng: -79.474_102,
                msl: 188,
                zoom: 16,
              },
              gltfMasses: {
                url: "assets/ON/Toronto/DA/glb/ON-Toronto-DA-masses.gltf",
              },
              ifcPath: "assets/ON/Toronto/DA/ifc/",
              gltfPath: "assets/ON/Toronto/DA/glb/ON_Toronto_DA_",
              jsonPropertiesPath: "assets/ON/Toronto/DA/json/ON_Toronto_da_",
              objects: {
                admin: {
                  name: "Admin, Data, Cafe, Superstore, Bays 1-6",
                  ifcFileName: "ON_Toronto_DA_admin.ifc",
                },
                b7_10: {
                  name: "Bays 7 to 10",
                  ifcFileName: "ON_Toronto_DA_b7_10.ifc",
                },
                b11: {
                  name: "Bay 11",
                  ifcFileName: "ON_Toronto_DA_b11.ifc",
                },
                b12: {
                  name: "Bay 12",
                  ifcFileName: "ON_Toronto_DA_b12.ifc",
                },
              },
            },
          },
          layers: {
            trees: setLayer(
              "trees",
              "Toronto trees",
              "assets/ON/Toronto/geojson/ON-Toronto-trees.geojson",
              "green",
              torontoTrees
            ),
            bikes: setLayer(
              "bikes",
              "Bicycle parking",
              "assets/ON/Toronto/geojson/ON-Toronto-bike_parking.geojson",
              "orange"
            ),
            busStops: setLayer(
              "busStops",
              "Transit shelter",
              "assets/ON/Toronto/geojson/ON-Toronto-transit_shelter.geojson",
              "yellow"
            ),
            litter: setLayer(
              "litter",
              "Litter Receptacles",
              "assets/ON/Toronto/geojson/ON-Toronto-litter_receptacle.geojson",
              "blue"
            ),
            wc: setLayer(
              "wc",
              "Public Washrooms",
              "assets/ON/Toronto/geojson/ON-Toronto-public_washroom.geojson",
              "#eeeeee"
            ),
            bench: setLayer(
              "bench",
              "Benches",
              "assets/ON/Toronto/geojson/ON-Toronto-bench.geojson",
              "#a17c4c"
            ),
          },
        },
      },
    },
    PE: {
      name: "Prince Edward Island",
      code: 11,
      term: "PE",
      concise: "PROV",
      coordinates: {
        lat: 46.25,
        lng: -63,
      },
      cities: {
        places: {},
      },
    },
    QC: {
      name: "Quebec",
      code: 24,
      term: "QC",
      concise: "PROV",
      coordinates: {
        lat: 52.9399,
        lng: -73.5491,
      },
      cities: {
        places: {},
      },
    },
    SK: {
      name: "Saskatchewan",
      code: 47,
      term: "SK",
      concise: "PROV",
      coordinates: {
        lat: 55,
        lng: -106,
      },
      cities: {
        places: {},
      },
    },
    NT: {
      name: "Northwest Territories",
      code: 61,
      term: "NT",
      concise: "TERR",
      coordinates: {
        lat: 64.266_67,
        lng: -119.183_33,
      },
      cities: {
        places: {},
      },
    },
    NU: {
      name: "Nunavut",
      code: 62,
      term: "NU",
      concise: "TERR",
      coordinates: {
        lat: 64.15,
        lng: -95.5,
      },
      cities: {
        places: {},
      },
    },
    YU: {
      name: "Yukon",
      code: 60,
      term: "YU",
      concise: "TERR",
      coordinates: {
        lat: 63.633_33,
        lng: -135.766_66,
      },
      cities: {
        places: {},
      },
    },
  },
};

async function getJson(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

async function setGeojson(items) {
  const geojson = { type: "FeatureCollection" };
  geojson.features = [];
  for (const key in items) {
    const item = items[key];
    geojson.features.push({
      type: "Feature",
      id: `${item.id}`,
      geometry: {
        type: "Point",
        coordinates: [item.coordinates[0], item.coordinates[1]],
      },
      properties: {
        name: `${item.name}`,
        title: `${item.title}`,
      },
    });
  }

  return geojson;
}

async function setLayer(id, layerName, url, color, funct) {
  const infoText = info(
    `<b>${layerName}</b> <br>click on markers to see details`
  );
  const layer = {
    id,
    name: layerName,
    // Color : Math. floor(Math. random()*16777215), // random color
    color,
    svg: icons[id]
      ? `${icons[id]}${infoText}`
      : `<h1>${layerName[0]}${info}</h1>`,
  };
  !funct
    ? (layer.geojson = async () => await geojsonLayer(layerName, url))
    : (layer.geojson = funct);
  return layer;
}

async function geojsonLayer(layerName, url) {
  const json = await getJson(url);
  const items = {};
  const features = json.features;
  for (const feature of features) {
    const { ID } = feature.properties;
    if (ID === "" || !ID) {
      continue;
    }

    if (!feature.geometry) {
      continue;
    }

    items[ID] = {
      id: ID,
      name: `${layerName}: ${ID}`,
      coordinates: feature.geometry.coordinates,
      title: `<b>${layerName}</b> <br> ID: ${ID}`,
    };
  }

  const geojson = await setGeojson(items);
  return geojson;
}

async function torontoTrees(place) {
  const json = await getJson(
    "assets/ON/Toronto/geojson/ON-Toronto-trees.geojson"
  );
  const trees = {};
  const features = json.features;
  const { lng, lat } = place.coordinates;
  let geojson;
  for (const feature of features) {
    if (!feature.geometry) {
      continue;
    }

    const fLng = feature.geometry.coordinates[0];
    const fLat = feature.geometry.coordinates[1];
    if (
      fLng > lng - lngRange &&
      fLng < lng + lngRange &&
      fLat < lat + latRange &&
      fLat > lat - latRange
    ) {
      trees[feature.properties._id] = {
        id: feature.properties._id,
        name: feature.properties.COMMON_NAME,
        coordinates: feature.geometry.coordinates,
        title: `<b>Tree specie:</b> ${
          feature.properties.COMMON_NAME
        }<br> <b>DBH:</b> ${Number.parseFloat(
          feature.properties.DBH_TRUNK
        ).toFixed(2)}`,
      };
    }
  }

  geojson = await setGeojson(trees);
  return geojson;
}

async function ottawaTrees(place) {
  const json = await getJson("assets/ON/Ottawa/json/ON-Ottawa-trees.json");
  const trees = {};
  const features = json.features;
  const { lng, lat } = place.coordinates;
  for (const feature of features) {
    if (!feature.geometry) {
      continue;
    }

    const fLng = feature.geometry.coordinates[0];
    const fLat = feature.geometry.coordinates[1];
    if (
      fLng > lng - lngRange &&
      fLng < lng + lngRange &&
      fLat < lat + latRange &&
      fLat > lat - latRange
    ) {
      trees[feature.properties.OBJECTID] = {
        id: feature.properties.OBJECTID,
        name: feature.properties.SPECIES,
        coordinates: feature.geometry.coordinates,
        title: `<b>Tree specie:</b> ${
          feature.properties.SPECIES
        }<br> <b>DBH:</b> ${Number.parseFloat(feature.properties.DBH).toFixed(
          2
        )}`,
      };
    }
  }

  return await setGeojson(trees);
}

async function ocTranspo(place) {
  const json = await getJson("assets/ON/Ottawa/json/ON-Ottawa-busStops.json");
  const busStops = {};
  for (const busStop of json) {
    busStops[busStop.stop_code] = {
      id: busStop.stop_code,
      name: busStop.stop_name,
      coordinates: [busStop.stop_lon, busStop.stop_lat],
      title: `<b>Stop code:</b> ${busStop.stop_code}<br> <b>Stop Name:</b> ${busStop.stop_name}`,
    };
    busStops;
    continue;
  }

  return await setGeojson(busStops);
}

function info(info) {
  return `<span class="info-text">${info}</span>`;
}
