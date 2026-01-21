Param(
    [string]$SubscriptionId = "<SUBSCRIPTION_ID>",
    [string]$ResourceGroup = "<RESOURCE_GROUP>",
    [string]$SPName = "github-actions-sp",
    [string]$Repo = "<owner/repo>"
)

if ($SubscriptionId -eq "<SUBSCRIPTION_ID>" -or $ResourceGroup -eq "<RESOURCE_GROUP>" -or $Repo -eq "<owner/repo>") {
    Write-Host "Por favor edita los parámetros o pásalos al ejecutar el script:`n./create_azure_sp_and_set_secret.ps1 -SubscriptionId <id> -ResourceGroup <rg> -Repo owner/repo"
    exit 1
}

Write-Host "Creando Service Principal '$SPName' en la suscripción $SubscriptionId (role: Contributor)"
$spJson = az ad sp create-for-rbac --name $SPName --role contributor --scopes "/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroup" --sdk-auth 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error creando el Service Principal:`n$spJson"
    exit 1
}

Write-Host "Service Principal creado. Output JSON (guárdalo si lo deseas):"
Write-Host $spJson

Write-Host "Configurando secreto 'AZURE_CREDENTIALS' en el repositorio $Repo usando GitHub CLI..."

# Requiere gh CLI autenticado y permisos para escribir secretos en el repo
gh secret set AZURE_CREDENTIALS --body "$spJson" --repo $Repo

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al subir el secreto a GitHub. Asegúrate de tener 'gh' autenticado y permisos adecuados."
    exit 1
}

Write-Host "Secreto 'AZURE_CREDENTIALS' configurado correctamente en $Repo"
