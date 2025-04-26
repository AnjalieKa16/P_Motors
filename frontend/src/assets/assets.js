import logosparep from './logo1.jpg'
import backgroundImage1 from './backgroundImage1.jpg'
import search_line from './search-line.svg'
import shopping_cart from './shopping-cart-2.svg'
import user from './user-line.svg'
import basket from './basket.jpg'
import brake from './brake_set.jpg'
import filter from './filter.png'
import Electrical_Electronics from './Electrical&Electronics.jpg'
import LubricantsFluids from './EngineOil.jpg'
import Lightnings from './Lightnings.jpg'
import ToyotaGenuineSparkPlugs90919_01265 from './ToyotaGenuineSparkPlugs90919_01265.png'
import ToyotaMotorOilSP15W_40_4L from './ToyotaMotorOilSP15W_40_4L.jpg'
import Honda_Genuine_Spark_Plug_12290_RBJ_003 from './Honda_Genuine_Spark_Plug_12290_RBJ_003.jpg'
import Toyota_Genuine_Motor_Oil_10W_30 from './Toyota_Genuine_Motor_Oil_10W_30.png'
import add_icon_white from './addIconWhite.png'
import add_icon_green from './addIconGreen.jpg'
import remove_icon_red from './removeIconred.png'
import HondaGenuineOilFilter15400RTA_00 from './HondaGenuineOilFilter15400RTA_00.jpg'
import Mobil_1TM_5W_30_1_768x768 from './Mobil_1TM_5W_30_1_768x768.jpg'
import facebookIcon2 from './facebookIcon2.png'
import toyota3 from './toyota3.png'
import visa from './visa.svg'
import mastercard from './mastercard.svg'
import paypal from './paypal.svg'
import location from './location.svg'
import facebook from './facebook.svg'
import phone from './phone.svg'
import shoppingCart from './shoppingCart.svg'
import cross_icon from './cross_icon.svg'
/*import basket from './basket.jpg'
import background1 from './backgrond1.jpg'

import Honda_Genuine_Spark_Plug_12290_RBJ_003 from 'Honda_Genuine_Spark_Plug_12290_RBJ_003.jpg'
import mitsubizi from 'mitsubizi'
import Toyota_Genuine_Motor_Oil_10W_30 from 'Toyota_Genuine_Motor_Oil_10W_30'
*/

export const assets = {
    logosparep,
    backgroundImage1,
    search_line,
    shopping_cart,
    basket,
    add_icon_white,
    add_icon_green,
    remove_icon_red,
    facebookIcon2,
    user,
    visa,
    mastercard,
    paypal,
    location,
    facebook,
    phone,
    shoppingCart,
    cross_icon

}


export const category_list=[
    
    {
        category_name: 'Brakes',
        category_image: brake
    },
    
    {
        category_name: 'Filters',
        category_image: filter
    },

    {
        category_name: 'Electrical & Electronics',
        category_image: Electrical_Electronics
    },
    
    {
        category_name: 'Lubricants & Fluids', //oils
        category_image: LubricantsFluids
    },
    
    {
        category_name: 'Lightnings',
        category_image: Lightnings   
    }
]


export const spare_parts_list = [
    {
      _id: "1",
      name: "Toyota Genuine Spark Plugs 90919-01265",
      image: ToyotaGenuineSparkPlugs90919_01265,  // Replace with actual image file reference
      price: 25,
      description: "High-quality brake pads suitable for various car models.",
      category: "Electrical_Electronics"
    },

    {
        _id: "2",
        name: "Toyota Motor OilS P15W-40 4L",
        image: ToyotaMotorOilSP15W_40_4L,  // Replace with actual image file reference
        price: 25,
        description: "High-quality brake pads suitable for various car models.",
        category: "Lubricants & Fluids"
      },


      {
        _id: "3",
        name: "Honda Genuine Spark Plug 12290_RBJ_003",
        image: Honda_Genuine_Spark_Plug_12290_RBJ_003,  // Replace with actual image file reference
        price: 25,
        description: "High-quality brake pads suitable for various car models.",
        category: "Brakes"
      },


      {
        _id: "4",
        name: "Toyota Genuine Motor Oil 10W-30",
        image: Toyota_Genuine_Motor_Oil_10W_30,  // Replace with actual image file reference
        price: 25,
        description: "High-quality brake pads suitable for various car models.",
        category: "Lubricants & Fluids"
      },

      {
        _id: "5",
        name: "HondaGenuine Oil Filter 15400RTA-00",
        image: HondaGenuineOilFilter15400RTA_00,  // Replace with actual image file reference
        price: 25,
        description: "High-quality brake pads suitable for various car models.",
        category: "Filters"
      },

      {
        _id: "6",
        name: "Mobil-1™-5W-30-1-768x768",
        image: Mobil_1TM_5W_30_1_768x768,  // Replace with actual image file reference
        price: 25,
        description: "High-quality brake pads suitable for various car models.",
        category: "Lubricants & Fluids"
      }

      

]

