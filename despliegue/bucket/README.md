# Primeros pasos
Crear un bucket de S3 con toda la configuración en predeterminado menos el nombre.

## Desactivar el Block public access (en la pestaña Permissions)

## Añadir el Bucket Policy (en la pestaña Permissions)
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::teatrogaleguistas3/*"
        }
    ]
}

IMPORTANTE MODIFICAR EL "RESOURCE" AL NOMBRE DEL BUCKET

## Modificar Static website hosting (en la pestaña Propierties)
Poner index.html tanto en "Index document" como en "Error document - optional"

En "Redirection rules – optional" pondremos el siguiente JSON modificando el HostName con el nombre de nuestro Bucket
[
    {
        "Condition": {
            "HttpErrorCodeReturnedEquals": "404"
        },
        "Redirect": {
            "HostName": "teatrogaleguistas3.s3-website-us-east-1.amazonaws.com",
            "Protocol": "http",
            "ReplaceKeyPrefixWith": ""
        }
    }
]