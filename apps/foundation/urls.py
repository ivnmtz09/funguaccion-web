from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, PostViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'categories', CategoryViewSet, basename='categories')

urlpatterns = router.urls
