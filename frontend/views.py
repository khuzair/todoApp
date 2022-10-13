from django.shortcuts import render


def index_list(request):
    return render(request, 'frontend/index.html')
