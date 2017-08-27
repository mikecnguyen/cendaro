# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import Http404
from django.shortcuts import render
from main.models import User, Home

# Create your views here.
from django.http import HttpResponse
from django.template.loader import get_template

def index(request):
    user_list = User.objects.order_by('-created_date')[:5]
    home_list = Home.objects.order_by('-posted_date')[:5]
    context = {'user_list': user_list, 'home_list': home_list}
    return render(request, 'index.html', context)

def homes(request):
    if request.method == 'POST':
        location = ''

    home_list = Home.objects.order_by('-posted_date')[:5]
    context = {'home_list': home_list}
    return render(request, 'homes.html', context)

def for_sale(request):
    template = get_template('for_sale.html')
    html = template.render({'name': 'mike'}, request)
    return HttpResponse(html)