from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, PostViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = router.urls
