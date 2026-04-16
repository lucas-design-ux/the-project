rm fix_spoke_urls.py
python3 -c "
content = '''import requests

URL = \"http://localhost:1337\"
TOKEN = \"4de75bf5549ea640368cbe8751d6853eed55ad8f313ee9f6f062f41cb69653d499f371b69040ef6741c386dcd26f44fd59cd794c7466f6126d4a33cfc3e19dbcbf6901015abc26ea4e23baebbc109e0120cd8859089eff7810f04f5d612025bfaac9aad13e58be9bef435d9da2efd91e10714fc79e623f0547e358b1a298481d\"
HEADERS = {
    \"Authorization\": f\"Bearer {TOKEN}\",
    \"Content-Type\": \"application/json\"
}

def get_all_articles():
    print(\"Buscando artigos...\")
    articles = []
    page = 1
    while True:
        url = f\"{URL}/api/articles?pagination[page]={page}&pagination[pageSize]=100&populate=cms_spoke_mappings\"
        response = requests.get(url, headers=HEADERS)
        print(f\"Status: {response.status_code}\")
        data = response.json()
        if \"data\" not in data:
            break
        articles.extend(data[\"data\"])
        pagination = data.get(\"meta\", {}).get(\"pagination\", {})
        if page >= pagination.get(\"pageCount\", 1):
            break
        page += 1
    return articles

def populate_inserted_urls():
    articles = get_all_articles()
    print(f\"Total: {len(articles)} artigos\")
    updated_count = 0
    for article in articles:
        attrs = article.get(\"attributes\", article)
        mappings = attrs.get(\"cms_spoke_mappings\", [])
        if not mappings or not isinstance(mappings, list):
            continue
        has_changes = False
        new_mappings = []
        for mapping in mappings:
            if not isinstance(mapping, dict):
                new_mappings.append(mapping)
                continue
            inserted_url = mapping.get(\"inserted_url\", \"\")
            spoke_cms_id = mapping.get(\"spoke_cms_id\", \"\")
            if (not inserted_url) and spoke_cms_id:
                mapping[\"inserted_url\"] = f\"https://wealthlogik.com/article/{spoke_cms_id}/\"
                has_changes = True
                print(f\"  -> {spoke_cms_id}\")
            new_mappings.append(mapping)
        if has_changes:
            print(f\"Atualizando artigo ID: {article[chr(39)]id[chr(39)]}\")
            put_url = f\"{URL}/api/articles/{article[chr(39)]id[chr(39)]}\"
            payload = {\"data\": {\"cms_spoke_mappings\": new_mappings}}
            response = requests.put(put_url, json=payload, headers=HEADERS)
            if response.ok:
                updated_count += 1
                print(\"  SUCESSO\")
            else:
                print(f\"  ERRO: {response.text[:200]}\")
    print(f\"Finalizado! {updated_count} artigos atualizados.\")

if __name__ == \"__main__\":
    populate_inserted_urls()
'''
with open('fix_spoke_urls.py', 'w') as f:
    f.write(content)
print('Arquivo criado!')
"