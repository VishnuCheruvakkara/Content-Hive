from rest_framework import serializers
import re
import bleach

def validate_title(value):
    if len(value) < 5:
        raise serializers.ValidationError("Title must be at least 5 characters.")
    if not re.match(r'^[A-Za-z0-9_ ]+$', value):
        raise serializers.ValidationError("Title can only contain letters, numbers, spaces, and underscore (_).")
    return value

def validate_description(value):
    if len(value) < 10:
        raise serializers.ValidationError("Description must be at least 10 characters.")
    if not re.match(r'^[A-Za-z0-9_ ]+$', value):
        raise serializers.ValidationError("Description can only contain letters, numbers, spaces, and underscore (_).")
    return value

def validate_content(value):
    if not value or len(value.strip()) == 0:
        raise serializers.ValidationError("Content cannot be empty.")

    # Remove full <script>...</script> blocks
    value = re.sub(
        r'<script.*?>.*?</script>',
        '',
        value,
        flags=re.DOTALL | re.IGNORECASE
    )

    # Remove any remaining <script ...> tags
    value = re.sub(r'<script.*?>', '', value, flags=re.IGNORECASE)

    # Clean with Bleach — keep ALL other HTML (tags + attributes)
    cleaned = bleach.clean(
        value,
        tags=[],            # allow no "safe tags" (but since strip=False, they STAY)
        attributes={},      # allow attributes
        strip=False,        # DO NOT strip unknown tags → keeps HTML
        strip_comments=True
    )

    # 4. Validate meaningful text
    text_only = bleach.clean(cleaned, tags=[], strip=True)
    if len(text_only.strip()) < 20:
        raise serializers.ValidationError("Content must be meaningful (min 20 characters).")

    return cleaned
