using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Onlib.DataAccessLayer;
using Onlib.Models;
using Onlib.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public async Task<int> MakeOrder([FromBody]BookUserViewModel model)
        {
            var mapped = _mapper.Map<BookUserViewModel, BookUserModel>(model);
            var isSaved = await _repository.Order(mapped);
            return isSaved;
        }

        [HttpPost("[action]")]
        public async Task<int> Receive([FromBody]BookUserViewModel model)
        {
            var mapped = _mapper.Map<BookUserViewModel, BookUserModel>(model);
            var isSaved = await _repository.Recevie(mapped);
            return isSaved;
        }

        [HttpGet("[action]")]
        public async Task<BookUserModel> GetOrderOrReceive([FromBody]BookUserViewModel model)
        {
            var mapped = _mapper.Map<BookUserViewModel, BookUserModel>(model);
            var result = await _repository.GetOrderOrReceive(mapped);
            return result;
        }

        [HttpPost("[action]")]
        public async Task<int> Return([FromBody]BookUserViewModel model)
        {
            var mapped = _mapper.Map<BookUserViewModel, BookUserModel>(model);
            var isReturned = await _repository.ReturnOrderOrReceive(mapped);
            return isReturned;
        }

        [HttpGet("[action]/{userId}")]
        public IEnumerable<BookUserViewModel> GetOrders(int userId)
        {
            var orders = _repository.GetAllOrders(userId);
            var mapped = _mapper.Map<IQueryable<BookUserModel>, IEnumerable<BookUserViewModel>>(orders);
            return mapped;
        }
    }
}