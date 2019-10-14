using AutoMapper;
using Onlib.Models;

namespace Onlib.ViewModels
{
    public class ViewModelProfile : Profile
    {
        public ViewModelProfile()
        {
            CreateMap<BookModel, BookViewModel>()
                .ForMember(dest => dest.Cover, opt => opt.MapFrom(src => src.Cover.Image));
            CreateMap<BookViewModel, BookModel>()
                .ForPath(dest => dest.Cover.Image, opt => opt.MapFrom(src => src.Cover));

            CreateMap<UserCommentModel, CommentViewModel>()
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.Comment.Comment))
                .ForMember(dest => dest.BookId, opt => opt.MapFrom(src => src.Comment.BookId));
            CreateMap<CommentViewModel, UserCommentModel>()
                .ForPath(dest => dest.Comment.Comment, opt => opt.MapFrom(src => src.Comment))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Author.Id))
                .ForPath(dest => dest.Comment.BookId, opt => opt.MapFrom(src => src.BookId));

            CreateMap<UserModel, UserViewModel>();
            CreateMap<UserViewModel, UserModel>();

            CreateMap<BookUserModel, BookUserViewModel>();
            CreateMap<BookUserViewModel, BookUserModel>();

        }
    }
}
