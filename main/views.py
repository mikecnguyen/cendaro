# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import Http404
from django.shortcuts import render
from main.models import User, Home

# Create your views here.
from django.http import HttpResponse
from django.template.loader import get_template

def index(request):
    user_list = User.objects.order_by('-created_date')
    home_list = Home.objects.order_by('-posted_date')
    context = {'user_list': user_list, 'home_list': home_list}
    return render(request, 'index.html', context)

def homes(request):
    if request.method == 'POST':
        query = request.POST.get("query", "")

    home_list = Home.objects.order_by('-posted_date')
    context = {'home_list': home_list}
    return render(request, 'homes.html', context)

def for_sale(request):
    home_list = Home.objects.order_by('-posted_date')
    context = {'home_list': home_list}
    return render(request, 'for_sale.html', context)

def home_details(request, full_addr=None):
    home = Home.objects.get(full_addr=full_addr)
    context = {'full_addr': full_addr, 'home_details': home}
    return render(request, 'home_details.html', context)