import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Student


def student_to_dict(student):
    return {
        'id': student.id,
        'name': student.name,
        'email': student.email,
        'phone': student.phone,
        'age': student.age,
        'address': student.address,
        'course': student.course,
    }


def read_fields(data):
    """Pick the fields we accept from the JSON sent by JavaScript."""
    age = data.get('age')
    return {
        'name': data['name'],
        'email': data['email'],
        'phone': data.get('phone', ''),
        'age': int(age) if age not in (None, '') else None,
        'address': data.get('address', ''),
        'course': data['course'],
    }


def home(request):
    return render(request, 'index.html')


@csrf_exempt
def student_api(request):
    # READ: GET /api/students/
    if request.method == 'GET':
        students = Student.objects.all()
        return JsonResponse([student_to_dict(s) for s in students], safe=False)

    # CREATE: POST /api/students/
    if request.method == 'POST':
        data = json.loads(request.body)
        student = Student.objects.create(**read_fields(data))
        return JsonResponse({
            'message': 'Student created successfully',
            'id': student.id,
        })

    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def student_detail(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return JsonResponse({'message': 'Student not found'}, status=404)

    # UPDATE: PUT /api/students/<id>/
    if request.method == 'PUT':
        data = json.loads(request.body)
        for field, value in read_fields(data).items():
            setattr(student, field, value)
        student.save()
        return JsonResponse({'message': 'Student updated successfully'})

    # DELETE: DELETE /api/students/<id>/
    if request.method == 'DELETE':
        student.delete()
        return JsonResponse({'message': 'Student deleted successfully'})

    return JsonResponse({'error': 'Method not allowed'}, status=405)
