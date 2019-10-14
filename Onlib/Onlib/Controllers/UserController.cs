using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Onlib.DataAccessLayer;
using Onlib.Models;
using AutoMapper;
using Onlib.ViewModels;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Onlib.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        public UserController(IUserRepository repository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _repository = repository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserViewModel model)
        {
            var user = _repository.Authenticate(model.UserName, model.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            var mapped = _mapper.Map<UserModel, UserViewModel>(user);
            mapped.Token = tokenString;
            return Ok(mapped);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody]UserViewModel user)
        {
            try
            {
                // save 
                var mapped = _mapper.Map<UserViewModel, UserModel>(user);
                _repository.Create(mapped, mapped.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var users = _repository.GetAll();
            var mapped = _mapper.Map<IQueryable<UserModel>, IEnumerable<UserViewModel>>(users);
            return Ok(mapped);
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _repository.GetById(id);
            var mapped = _mapper.Map<UserModel, UserViewModel>(user);
            return Ok(mapped);
        }

        [HttpPut("[action]/{id}")]
        public IActionResult Update(int id, [FromBody]UserViewModel user)
        {

            try
            {
                var mapped = _mapper.Map<UserViewModel, UserModel>(user);
                _repository.Update(mapped, mapped.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return Ok();
        }
    }
}