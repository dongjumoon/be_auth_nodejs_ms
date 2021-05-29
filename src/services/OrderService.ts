import OrderRepository from '@/repository/OrderRepository';
class OrderService {
  private orderRepository = OrderRepository;

  public findBy = async () => {
    // const result = await this.orderRepository.create({
    //   userId: 'testm34345',
    //   productId: '',
    //   startDateTime: '',
    //   endDateTime: '',
    //   orderDate: '',
    // });
    const name = await this.orderRepository.findOne({ userId: 'testm34345' });
    console.log(name);
    return name;
  };
}

export default OrderService;
