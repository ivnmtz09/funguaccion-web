from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    CustomLoginView,
    LogoutView,
    UserMeView,
    UserViewSet,
    UserPermissionsView,
    UpdateProfileView,
)

router = DefaultRouter()
router.register(r'', UserViewSet, basename='users')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', UserMeView.as_view(), name='user_me'),
    path('me/update/', UpdateProfileView.as_view(), name='update_profile'),
    path('me/permissions/', UserPermissionsView.as_view(), name='user_permissions'),
    path('', include(router.urls)),
]
