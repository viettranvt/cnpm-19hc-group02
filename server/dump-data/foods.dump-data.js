const DumpDataConstant = require('./dump-data.constant');
const FoodsModel = require('../modules/foods/foods.model');
const FoodsConstant = require('../modules/foods/foods.constant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createdFoods = async () => {
  logger.info(`${DumpDataConstant.LOGGER.FOODS}::createdFoods::is called`);
  try{
    const foods = [
      'Bồ câu tiềm bí đỏ',
      'Phở',
      'Bánh chưng',
      'Cao lầu',
      'Bún chả',
      'Bánh ướt',
      'Cơm tấm',
      'Mì Quảng',
      'Hủ tiếu',
      'Cơm hến',
      'Sữa tươi trân châu đường đen',
      'Trà sữa thạch Kiwi Newzealand',
      'Trà sữa kim cương Hokkaido',
      'Hồng trà Macchiato'
    ];

    const config = {
      'Bồ câu tiềm bí đỏ': {
        name: 'Bồ câu tiềm bí đỏ',
        group: FoodsConstant.GROUP.SOUP,
        price: 250000,
        description: 'Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.'
      },
      'Phở': {
        name: 'Phở',
        group: FoodsConstant.GROUP.SOUP,
        price: 50000,
        description: 'Một trong những món ăn truyền thống Việt Nam nổi tiếng trên toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại rau thơm, gia vị như: tương, tiêu, chanh, nước mắm, ớt…'
      },
      'Bánh chưng': {
        name: 'Bánh chưng',
        group: FoodsConstant.GROUP.DRY,
        price: 100000,
        description: 'Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.'
      },
      'Cao lầu': {
        name: 'Cao lầu',
        group: FoodsConstant.GROUP.DRY,
        price: 100000,
        description: 'Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước.'
      },
      'Bún chả': {
        name: 'Bún chả',
        group: FoodsConstant.GROUP.DRY,
        price: 70000,
        description: 'Bún chả cũng là một trong những món ăn truyền thống Việt Nam gắn liền với lịch sử lâu đời của mảnh đất Hà Nội. Bún ăn cùng với chả thịt lợn nướng trên than hoa, một bát nước mắm chua cay mặn ngọt và rau sống. Trong chuyến thăm Việt Nam đầu năm 2016, cựu Tổng thống Mỹ Barack Obama cùng cố Đầu bếp lừng danh Anthony Bourdain đã thưởng thức món ăn này.'
      },
      'Bánh ướt': {
        name: 'Bánh ướt',
        group: FoodsConstant.GROUP.DRY,
        price: 35000,
        description: 'Bột gạo hấp tráng mỏng, để ăn khi còn ướt, bên trong cuốn nhân. Bánh thường ăn với một loại nước chấm pha nhạt từ nước mắm.'
      },
      'Cơm tấm': {
        name: 'Cơm tấm',
        group: FoodsConstant.GROUP.RICE,
        price: 35000,
        description: 'Cơm tấm có thể gồm cả sườn, bì, chả, trứng hoặc không gồm đầy đủ các món trên nhưng phải có nước mắm ngọt.'
      },
      'Mì Quảng': {
        name: 'Mì Quảng',
        group: FoodsConstant.GROUP.SOUP,
        price: 55000,
        description: 'Được làm từ sợi mì bằng bột gạo xay mịn và tráng thành từng lớp bánh mỏng, sau đó thái theo chiều ngang để có những sợi mì mỏng khoảng 2mm. Sợi mì làm bằng bột mỳ được trộn thêm một số phụ gia cho đạt độ dòn, dai. Dưới lớp mì là các loại rau sống, trên mì là thịt heo nạc, tôm, thịt gà cùng với nước dùng.'
      },
      'Hủ tiếu': {
        name: 'Hủ tiếu',
        group: FoodsConstant.GROUP.SOUP,
        price: 45000,
        description: 'Bánh hủ tiếu chan nước dùng với thịt băm nhỏ, lòng heo nấu cùng. Sau đó trụng sơ bánh hủ tiếu với nước dùng, rồi cho các nguyên liệu phụ vào như giá đỗ, hẹ, thịt băm cùng lòng lợn vào.'
      },
      'Cơm hến': {
        name: 'Cơm hến',
        group: FoodsConstant.GROUP.RICE,
        price: 65000,
        description: 'Cơm nguội trộn với hến luộc, nước hến, mắm ruốc, rau bắp cải, tóp mỡ, bánh tráng nướng, mì xào giòn, ớt màu, đậu phộng nguyên hạt, dầu ăn chín, tiêu và muối.'
      },
      'Sữa tươi trân châu đường đen': {
        name: 'Sữa tươi trân châu đường đen',
        group: FoodsConstant.GROUP.DRINK,
        price: 55000,
        description: 'Sữa tươi trân châu đường đen đang là món hot trend trên thị trường, vị béo ngậy của sữa tươi thanh trùng, vị dai dai ngọt ngọt của trân châu đường đen sẽ khiến bạn uống mãi không dừng.'
      },
      'Trà sữa thạch Kiwi Newzealand': {
        name: 'Trà sữa thạch Kiwi Newzealand',
        group: FoodsConstant.GROUP.DRINK,  
        price: 35000,
        description: 'Được làm từ hồng trà (trà đen) một loại trà được ưa chuộng để làm trà sữa, hồng trà có độ oxy hóa hoàn toàn (100%). Lá trà làm cho trà nâu sáng tới đỏ đậm của rượu nên được gọi là trà đen. Hồng trà có hương vị mạnh nhất, rất đậm vị nhưng thanh mát, hậu vị ngọt ngào. Khi được kết hợp với sữa tạo nên vị rất thơm, béo mà vị trà vẫn nguyên.'
      },
      'Trà sữa kim cương Hokkaido': {
        name: 'Trà sữa kim cương Hokkaido',
        group: FoodsConstant.GROUP.DRINK,  
        price: 45000,
        description: 'Trà sữa Hokkaido là sự kết hợp hoàn hảo của vị đắng dịu của cafe và vị ngọt ngào của caramel cùng những hạt thạch thơm phức. Nếu ai yêu thích hương vị ngọt ngào thì không thể bỏ lỡ trà sữa Hokkaido với caramel hòa quyện, vani thơm mát cùng sữa béo ngậy.'
      },
      'Hồng trà Macchiato': {
        name: 'Hồng trà Macchiato',
        group: FoodsConstant.GROUP.DRINK, 
        price: 65000,
        description: 'Hồng trà Macchiato là sự kết hợp của hồng trà nguyên chất và kem cheese.'
      }
    };

    await Promise.all(
      foods.map(async name => {
        const food = await FoodsModel.findOne( { where: { name } } );
        if (!food) {
          logger.info(`${DumpDataConstant.LOGGER.FOODS}::createdFoods::creating ${name}`);
          const newFood = new FoodsModel(config[name]);
          await newFood.save();
        }
      })
    );

  }catch(e){
    logger.error(`${DumpDataConstant.LOGGER.FOODS}::createdFoods::error`, e);
    throw new Error(e);
  }
}

module.exports = async () => {
  await createdFoods();
};