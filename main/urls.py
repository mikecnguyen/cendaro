from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^homes', views.homes, name='homes'),
    url(r'^homes/for_sale', views.for_sale, name='for_sale'),
    url(r'^home_details/(?P<full_addr>[\w\-]+)/$', views.home_details, name='home_details')
]