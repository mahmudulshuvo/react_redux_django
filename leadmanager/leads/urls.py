from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')
router.register('api/leads/<int:store_id>/', LeadViewSet, 'leads')

urlpatterns = router.urls
