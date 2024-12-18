from json import JSONDecodeError

from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


def json_request(func):
    def wrapped(request, *args, **kwargs):
        try:
            data = request.data
            return func(request, data, *args, **kwargs)
        except JSONDecodeError:
            return Response({"message": f"{request.body} is not valid json"}, status=HTTP_400_BAD_REQUEST)
        except BaseException as e:
            return Response({"message": f"Bad request, reason: {e}"}, status=HTTP_400_BAD_REQUEST)

    return wrapped
